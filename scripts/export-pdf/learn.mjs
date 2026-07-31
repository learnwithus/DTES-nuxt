/**
 * /learn is a single route that hides the entire learning module: the
 * objectives splash, every question, every question's revealed answer, every
 * section-feedback panel, the interactive reveals inside those panels, and the
 * completion screen.
 *
 * The quiz state lives as local component data on pages/learn.vue rather than in
 * Vuex, and `showFeedback` / `moduleComplete` are computed from `currentIndex`.
 * So the walk sets `moduleStarted` and `currentIndex` directly — no need to
 * answer questions correctly or click through the UI.
 */

// Injected into each page.evaluate. Walks the Vue tree from the root instance
// that Nuxt exposes as window.$nuxt.
const HELPERS = `
  function findVm(predicate) {
    const seen = new Set();
    const queue = [window.$nuxt];
    while (queue.length) {
      const vm = queue.shift();
      if (!vm || seen.has(vm)) continue;
      seen.add(vm);
      if (vm.$data && predicate(vm)) return vm;
      queue.push(...(vm.$children || []));
    }
    return null;
  }
  function findLearn() {
    return findVm((vm) => 'currentIndex' in vm.$data && 'sections' in vm.$data);
  }
`;

// StigmaImpacts.vue drives its panels off an `activeContent` key rather than a
// numeric index, and the keys only ever appear as literals in its template, so
// they cannot be discovered from component data. Kept in sync with that file.
const ACTIVE_CONTENT_KEYS = ["individual", "community", "staff"];

// Time for the slide-fade / fade transitions to finish before a capture.
const TRANSITION_MS = 600;

const evaluate = (page, body, arg) =>
  page.evaluate(
    new Function("arg", `${HELPERS}\nreturn (async () => {${body}})();`),
    arg
  );

/**
 * Drive the whole module, invoking `capture(label)` once per screen.
 *
 * Reveal steps are discovered at runtime rather than hardcoded: the feedback
 * panels mount different interactive components per section, and probing the
 * live tree means adding another one needs no changes here.
 */
export async function walkLearn(page, capture) {
  const shape = await evaluate(
    page,
    `
      const vm = findLearn();
      if (!vm) return null;
      return vm.sections.map((section) => ({
        questions: section.questions ? section.questions.length : 0,
        feedback: section.feedback ? section.feedback.length : 0,
      }));
    `
  );

  if (!shape) {
    throw new Error(
      "Could not locate the learn page component. If pages/learn.vue no longer " +
        "keeps `sections` and `currentIndex` in local data, this walk needs updating."
    );
  }

  let n = 0;
  const label = (name) => `learn-${String(n++).padStart(2, "0")}-${name}`;

  await setState(page, { kind: "objectives" });
  await capture(label("objectives"));

  for (const [s, section] of shape.entries()) {
    for (let q = 0; q < section.questions; q++) {
      await setState(page, { kind: "question", section: s, index: q });
      await capture(label(`s${s + 1}-q${q + 1}`));

      // Submitting reveals the correct answer inside the input and, for
      // non-matching questions, an explanation panel beside it.
      if (await revealAnswer(page)) {
        await capture(label(`s${s + 1}-q${q + 1}-answer`));
      }
    }

    for (let f = 0; f < section.feedback; f++) {
      await setState(page, {
        kind: "feedback",
        section: s,
        index: f,
        questionCount: section.questions,
      });
      await capture(label(`s${s + 1}-feedback${f + 1}`));

      for (const reveal of await describeReveals(page)) {
        await applyReveal(page, reveal);
        await capture(label(`s${s + 1}-feedback${f + 1}-${reveal.label}`));
      }
    }
  }

  await setState(page, { kind: "complete" });
  await capture(label("complete"));

  // pages/learn.vue guards beforeRouteLeave with a window.confirm when the
  // module is started but incomplete. A blocking dialog would wedge the export,
  // so stand the component back down before moving on.
  await setState(page, { kind: "objectives" });
}

/** Put the module on a given screen. */
async function setState(page, state) {
  await evaluate(
    page,
    `
      const vm = findLearn();
      if (!vm) throw new Error('learn component vanished mid-walk');
      const { kind, section, index, questionCount } = arg;

      if (kind === 'objectives') {
        vm.moduleStarted = false;
        vm.currentIndex = { section: 0, question: 0, feedback: 0 };
        return;
      }

      vm.moduleStarted = true;
      if (kind === 'question') {
        vm.currentIndex = { section, question: index, feedback: 0 };
      } else if (kind === 'feedback') {
        // showFeedback is computed: it turns on once the question index reaches
        // the end of the section's question list.
        vm.currentIndex = { section, question: questionCount, feedback: index };
      } else if (kind === 'complete') {
        vm.currentIndex = { section: vm.sections.length, question: 0, feedback: 0 };
      }
    `,
    {
      kind: state.kind,
      section: state.section ?? 0,
      index: state.index ?? 0,
      questionCount: state.questionCount ?? 0,
    }
  );

  await page.waitForTimeout(TRANSITION_MS);
}

/**
 * Reveal the answer for the current question.
 *
 * showAnswer is computed as userRequestedAnswer && userAnsweredQuestion, both
 * pre-declared on each question by helpers/formatLearnQuestions.js, so they are
 * reactive and can be set directly. Returns false when there is no question on
 * screen, so callers can skip the extra capture.
 */
async function revealAnswer(page) {
  const revealed = await evaluate(
    page,
    `
      const vm = findLearn();
      const question = vm && vm.currentQuestion;
      if (!question) return false;
      question.userAnsweredQuestion = true;
      question.userRequestedAnswer = true;
      return true;
    `
  );

  if (revealed) await page.waitForTimeout(TRANSITION_MS);
  return revealed;
}

/**
 * Find the interactive reveals available on the feedback panel currently shown.
 *
 * Timeline / OverdoseStats / AddressingStigma step through a `sections` array
 * via `sectionIndex`; StigmaImpacts switches on an `activeContent` key. Both
 * start collapsed, so their content is invisible without this.
 */
async function describeReveals(page) {
  return (
    (await evaluate(
      page,
      `
        const stepper = findVm(
          (vm) => 'sectionIndex' in vm.$data && Array.isArray(vm.$data.sections)
        );
        if (stepper) {
          return stepper.sections.map((_, index) => ({
            type: 'step',
            index,
            label: 'step' + (index + 1),
          }));
        }

        const switcher = findVm((vm) => 'activeContent' in vm.$data);
        if (switcher) {
          return arg.keys.map((key) => ({ type: 'content', key, label: key }));
        }

        return [];
      `,
      { keys: ACTIVE_CONTENT_KEYS }
    )) ?? []
  );
}

async function applyReveal(page, reveal) {
  await evaluate(
    page,
    `
      if (arg.type === 'step') {
        const vm = findVm(
          (candidate) =>
            'sectionIndex' in candidate.$data && Array.isArray(candidate.$data.sections)
        );
        if (vm) vm.sectionIndex = arg.index;
      } else {
        const vm = findVm((candidate) => 'activeContent' in candidate.$data);
        if (vm) vm.activeContent = arg.key;
      }
    `,
    reveal
  );

  await page.waitForTimeout(TRANSITION_MS);
}
