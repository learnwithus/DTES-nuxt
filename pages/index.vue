<template>
  <client-only placeholder="Loading...">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section" v-for="(question, index) in assessmentQuestions" v-bind:key="index">
        <div class="page-content">
          <h2 class="question">{{question.question}}</h2>
          <div class="answers">
            <vs-radio
              v-model="selectedAnswer"
              v-for="(answer, index) in question.answers"
              v-bind:key="index"
              :val="index"
            >{{answer.answer}}</vs-radio>
          </div>
          <vs-button flat :active="true" @click class="submit">Submit</vs-button>
        </div>
      </div>
    </full-page>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      selectedAnswer: 0,
    };
  },
  async asyncData(context) {
    const assessment = await context
      .$content("pre-assessment")
      .only("questions")
      .fetch();

    return {
      assessmentQuestions: assessment.questions,
      options: {
        navigation: true,
        licenseKey: context.env.fullscreenLicenseKey,
      },
    };
  },
};
</script>

<style>
.question {
  margin-bottom: 2em;
}

.answers {
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  margin-bottom: 2em;
}

.page-content {
  padding: 2em;
}

.submit {

}
</style>
