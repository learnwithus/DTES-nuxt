<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section" v-for="(question, index) in assessmentQuestions" v-bind:key="index">{{question.question}}</div>
  </full-page>
</template>

<script>
export default {
  data(){
    return {
      options: {
        navigation: true,
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
