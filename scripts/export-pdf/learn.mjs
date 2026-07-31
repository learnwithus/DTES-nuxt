/**
 * /learn is a single route that hides roughly twenty screens: the objectives
 * splash, every question, every feedback panel, and the completion screen.
 *
 * The quiz state lives as local component data on pages/learn.vue rather than in
 * Vuex, and `showFeedback` / `moduleComplete` are computed from `currentIndex`.
 * So the walk only has to set `moduleStarted` and `currentIndex` directly — no
 * need to answer questions correctly or click through the UI.
 */

// Runs in the browser. Nuxt exposes the root instance as window.$nuxt; the page
// component is the one carrying both `sections` and `currentIndex`.
const FIND_COMPONENT = `
  (() => {
    const seen = new Set();
    const queue = [window.$nuxt];
    while (queue.length) {
      const vm = queue.shift();
      if (!vm || seen.has(vm)) continue;
      seen.add(vm);
      if (vm.$data && 'currentIndex' in vm.$data && 'sections' in vm.$data) return vm;
      queue.push(...(vm.$children || []));
    }
    return null;
  })()
`;

/** Enumerate every screen the module can show, in reading order. */
export async function describeLearnStates(page) {
  const shape = await page.evaluate(`
    (() => {
      const vm = ${FIND_COMPONENT};
      if (!vm) return null;
      return vm.sections.map((section) => ({
        questions: section.questions ? section.questions.length : 0,
        feedback: section.feedback ? section.feedback.length : 0,
      }));
    })()
  `);

  if (!shape) {
    throw new Error(
      "Could not locate the learn page component. If pages/learn.vue no longer " +
        "keeps `sections` and `currentIndex` in local data, this walk needs updating."
    );
  }

  const states = [{ kind: "objectives", label: "learn-00-objectives" }];
  let n = 1;
  const pad = (i) => String(i).padStart(2, "0");

  shape.forEach((section, sectionIndex) => {
    for (let q = 0; q < section.questions; q++) {
      states.push({
        kind: "question",
        section: sectionIndex,
        index: q,
        label: `learn-${pad(n++)}-s${sectionIndex + 1}-q${q + 1}`,
      });
    }
    for (let f = 0; f < section.feedback; f++) {
      states.push({
        kind: "feedback",
        section: sectionIndex,
        index: f,
        questionCount: section.questions,
        label: `learn-${pad(n++)}-s${sectionIndex + 1}-feedback${f + 1}`,
      });
    }
  });

  states.push({ kind: "complete", label: `learn-${pad(n)}-complete` });
  return states;
}

/** Put the module into a given screen and wait for the slide-fade to settle. */
export async function applyLearnState(page, state) {
  await page.evaluate(
    ([kind, section, index, questionCount]) => {
      const seen = new Set();
      const queue = [window.$nuxt];
      let vm = null;
      while (queue.length) {
        const candidate = queue.shift();
        if (!candidate || seen.has(candidate)) continue;
        seen.add(candidate);
        if (
          candidate.$data &&
          "currentIndex" in candidate.$data &&
          "sections" in candidate.$data
        ) {
          vm = candidate;
          break;
        }
        queue.push(...(candidate.$children || []));
      }
      if (!vm) throw new Error("learn component vanished mid-walk");

      if (kind === "objectives") {
        vm.moduleStarted = false;
        vm.currentIndex = { section: 0, question: 0, feedback: 0 };
        return;
      }

      vm.moduleStarted = true;
      if (kind === "question") {
        vm.currentIndex = { section, question: index, feedback: 0 };
      } else if (kind === "feedback") {
        // showFeedback is computed: it turns on once question index reaches the
        // end of the section's question list.
        vm.currentIndex = { section, question: questionCount, feedback: index };
      } else if (kind === "complete") {
        vm.currentIndex = {
          section: vm.sections.length,
          question: 0,
          feedback: 0,
        };
      }
    },
    [state.kind, state.section ?? 0, state.index ?? 0, state.questionCount ?? 0]
  );

  // The <transition name="slide-fade"> wrappers need to finish before capture,
  // otherwise screens are caught mid-fade at partial opacity.
  await page.waitForTimeout(600);
}

/**
 * pages/learn.vue has a beforeRouteLeave guard that fires window.confirm when
 * the module is started but incomplete. A blocking dialog would wedge the whole
 * export, so stand the component back down before moving on.
 */
export async function resetLearnState(page) {
  await applyLearnState(page, { kind: "objectives" });
}
