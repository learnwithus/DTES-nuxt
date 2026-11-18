const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.REVIEW_PLAYWRIGHT || 'playwright');
const manifest = JSON.parse(fs.readFileSync(process.env.REVIEW_MANIFEST || 'docs/meeting-notes/course-review-manifest.json'));
const base = process.env.REVIEW_BASE_URL || 'http://localhost:3001';
const output = path.resolve(process.env.REVIEW_CAPTURE_DIR || 'output/pdf');
const screenshotOptions = {animations: 'disabled', style: '#nuxt-devtools-container { display: none !important; }'};

async function open(page, route) {
  const response = await page.goto(base + route, {waitUntil: 'domcontentloaded'});
  if (!response?.ok()) throw new Error(`Could not open ${route}: ${response?.status()}`);
  await page.waitForFunction(() => !!document.querySelector('#__nuxt')?.__vue_app__);
  await page.locator('#dtes-page').waitFor();
  await page.evaluate(() => document.fonts.ready);
}

async function showLesson(page, entry) {
  await page.evaluate(async entry => {
    let instance = document.querySelector('.learn-container').__vueParentComponent;
    while (instance && !instance.proxy?.sections) instance = instance.parent;
    const lesson = instance?.proxy;
    if (!lesson) throw new Error('Use a Nuxt development server for interactive lesson screenshots.');
    lesson.moduleStarted = !entry.intro;
    lesson.videoSlidePassed = entry.page !== 7;
    if (entry.intro) return;
    const section = lesson.sections[entry.section];
    lesson.currentIndex = {
      section: entry.final ? lesson.sections.length : entry.section,
      question: entry.feedback !== undefined ? section.questions.length : (entry.question || 0),
      feedback: entry.feedback || 0
    };
    if (entry.question !== undefined) {
      const question = section.questions[entry.question];
      question.userInput = entry.answer
        ? question.type === 'multiple-choice'
          ? question.answers.length - 1
          : question.type === 'match'
            ? question.answers.map(answer => Object.values(answer)[1])
            : 'Reflection for review'
        : undefined;
      question.userAnsweredQuestion = !!entry.answer;
      question.userRequestedAnswer = !!entry.answer;
    }
    await lesson.$nextTick();
  }, entry);
  await page.waitForTimeout(680);

  if (typeof entry.active === 'string') {
    const circles = {community: 0, staff: 1, individual: 2};
    await page.locator('.venn-cirlcle').nth(circles[entry.active]).dispatchEvent('click');
  } else if (typeof entry.active === 'number') {
    const widgets = {2: '.utilization-section', 3: '.timeline-item', 5: '.stigma-level'};
    await page.locator(widgets[entry.section]).nth(entry.active).dispatchEvent('mousedown');
    await page.waitForTimeout(630);
  }
}

async function capture(page, entry, visit) {
  if (visit) await open(page, entry.route);
  if (entry.route === '/learn') await showLesson(page, entry);
  await page.evaluate(scroll => {
    if (scroll === 'team') {
      const heading = [...document.querySelectorAll('h2, h3')]
        .find(node => /public health priority populations team/i.test(node.textContent));
      heading?.scrollIntoView();
      window.scrollBy(0, -90);
    } else {
      window.scrollTo(0, scroll === 'bottom' ? document.body.scrollHeight : Number(scroll) || 0);
    }
  }, entry.scroll);
  if (entry.page === 7) await page.locator('.stigma-video .plyr').waitFor({timeout: 20000});
  await page.waitForTimeout(250);
  const file = path.join(output, 'review-screenshots', `page-${String(entry.page).padStart(2,'0')}.png`);
  await page.screenshot({path: file, ...screenshotOptions});
  const result = {...entry, screenshot: file};
  if (entry.page === 7) {
    await page.getByRole('button', {name:'Next', exact:true}).click();
    await page.locator('.actual-question').waitFor();
    await page.waitForTimeout(400);
    result.followingScreenshot = path.join(output, 'review-screenshots', 'page-07-question.png');
    await page.screenshot({path: result.followingScreenshot, ...screenshotOptions});
  }
  console.log(`Captured source page ${entry.page}`);
  return result;
}

(async () => {
  fs.mkdirSync(path.join(output, 'review-screenshots'), {recursive:true});
  const browser = await chromium.launch({channel: process.env.REVIEW_BROWSER_CHANNEL || undefined});
  const captures = [];
  const errors = [];
  const selected = process.argv.slice(2).map(Number);
  const entries = manifest.filter(entry => !selected.length || selected.includes(entry.page));
  async function batch(entries, lessons = false) {
    if (!entries.length) return;
    const page = await browser.newPage({viewport: {width: 1440, height: 1080}});
    page.on('pageerror', error => errors.push({url:page.url(), message:error.message}));
    try {
      if (lessons) await open(page, '/learn');
      for (const entry of entries) captures.push(await capture(page, entry, !lessons));
    } finally {
      await page.close();
    }
  }
  try {
    const routes = entries.filter(entry => entry.route !== '/learn');
    await Promise.all([
      batch(entries.filter(entry => entry.route === '/learn'), true),
      batch(routes.filter((_, index) => index % 2 === 0)),
      batch(routes.filter((_, index) => index % 2 === 1))
    ]);
    if (errors.length) throw new Error(JSON.stringify(errors));
    fs.writeFileSync(path.join(output, 'captures.json'), JSON.stringify({
      captures: captures.sort((a,b) => a.page - b.page), errors
    }, null, 2));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
