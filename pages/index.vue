<template>
  <div>
    <h1>Home</h1>
    <nuxt-link to="/learn">Learn</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedAnswer: 0,
    };
  },
  async asyncData(context) {
    const assessment = [];

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
