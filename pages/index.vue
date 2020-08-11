<template>
<client-only placeholder="Loading...">
  <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section" v-for="(question, index) in assessmentQuestions" v-bind:key="index">
      <h2>{{question.question}}</h2>
      <ol>
        <li v-for="(answer, index) in question.answers" v-bind:key="index">{{answer.answer}}</li>
      </ol>
    </div>
  </full-page>
</client-only>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  async asyncData(context){
    const assessment = await context.$content('pre-assessment').only('questions').fetch()

    return {
      assessmentQuestions: assessment.questions,
      options: {
        navigation: true,
        licenseKey: context.env.fullscreenLicenseKey
      },
    }
  }
};
</script>

<style>

</style>
