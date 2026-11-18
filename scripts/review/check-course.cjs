const assert = require('node:assert/strict');
const { chromium } = require(process.env.REVIEW_PLAYWRIGHT || 'playwright');
(async () => {
  const browser = await chromium.launch({channel: process.env.REVIEW_BROWSER_CHANNEL || undefined});
  const page = await browser.newPage();
  await page.goto((process.env.REVIEW_BASE_URL || 'http://localhost:3001') + '/learn');
  await page.waitForFunction(() => !!document.querySelector('.learn-container')?.__vueParentComponent);
  const result = await page.evaluate(async () => {
    let instance = document.querySelector('.learn-container').__vueParentComponent;
    while (instance && !instance.proxy?.sections) instance = instance.parent;
    const v = instance?.proxy;
    if (!v) throw new Error('Use the Nuxt development server to check course state.');
    v.moduleStarted=true;
    const counts=v.sections.map(s=>({questions:s.questions.length,feedback:s.feedback.length}));
    v.currentIndex={section:0,question:2,feedback:0};
    v.nextScreen(); await v.$nextTick();
    const entersRetainedGraph=v.currentIndex.section===1 && v.showFeedback && !!v.currentFeedback;
    v.nextScreen(); await v.$nextTick();
    const nextQuestion=v.currentIndex.section===2 && !!v.currentQuestion;
    v.previousScreen(); await v.$nextTick();
    const backToGraph=v.currentIndex.section===1 && v.showFeedback && !!v.currentFeedback;
    v.previousScreen(); await v.$nextTick();
    const backToStigma=v.currentIndex.section===0 && v.showFeedback && !!v.currentFeedback;
    v.currentIndex={section:0,question:0,feedback:0};
    let visited=0;
    while(!v.moduleComplete && visited<40){
      if(v.currentQuestion && !v.showVideoSlide){v.currentQuestion.userAnsweredQuestion=true;v.currentQuestion.userRequestedAnswer=true;}
      v.nextScreen(); await v.$nextTick();visited++;
    }
    return {counts,entersRetainedGraph,nextQuestion,backToGraph,backToStigma,completed:v.moduleComplete,visited};
  });
  assert.equal(result.counts.reduce((n,s)=>n+s.questions,0),7);
  assert.deepEqual(result.counts[1],{questions:0,feedback:1});
  for(const key of ['entersRetainedGraph','nextQuestion','backToGraph','backToStigma','completed']) assert.equal(result[key],true,key);
  console.log(JSON.stringify(result,null,2));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
