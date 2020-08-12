<template>
  <client-only placeholder="Loading...">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section" v-for="(question, index) in assessmentQuestions" v-bind:key="index">
        <!-- Question Slide -->
        <div class="slide">
          <h2 class="question">{{question.question}}</h2>
          <div class="answers">
            <vs-radio
              v-model="selectedAnswer"
              v-for="(answer, index) in question.answers"
              v-bind:key="index"
              :val="index"
            >{{answer.answer}}</vs-radio>
          </div>
          <vs-button flat :active="true" @click="$refs.fullpage.api.moveSlideRight()" class="submit">Submit</vs-button>
        </div>

        <!-- Answer Slide -->
        <div class="slide">
          <h3>Here is the feedback / answer</h3>
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
        slidesNavigation: false,
        controlArrows: false,
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

.slide {
  padding: 2em;
}

.submit {
}
</style>
