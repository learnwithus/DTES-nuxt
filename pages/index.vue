<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section" v-for="(question, index) in assessmentQuestions" v-bind:key="index">
      <h2>{{question.question}}</h2>
      <ol>
        <li v-for="(answer, index) in question.answers" v-bind:key="index">{{answer.answer}}</li>
      </ol>
    </div>
  </full-page>
</template>

<script>
export default {
  data(){
    return {
      options: {
        navigation: true,
        licenseKey: process.env.FULLSCREEN_KEY || 'OPEN-SOURCE-GPLV3-LICENSE'
      },
      
    }
  },
  async asyncData(context){
    const assessment = await context.$content('pre-assessment').only('questions').fetch()

    return {
      assessmentQuestions: assessment.questions
    }
  }
};
</script>

<style>

</style>
