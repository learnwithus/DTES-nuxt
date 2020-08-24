<template>
  <main>
    <transition name="slide-fade" mode="out-in">
    <!-- Question View -->
    <div class="question" v-if="!showFeedback" :key="currentIndex.question">
      <h2>{{currentSectionNumber}}/</h2>
      <question :question="currentQuestion.question" />
      <learn-input :type="currentQuestion.type" :answers="currentQuestion.answers" :reveal-answer="showAnswer"/>

      <vs-button flat :active="true" @click="showAnswer = true" v-if="!showAnswer" >Submit</vs-button>
      <vs-button flat :active="true" @click="nextQuestion" v-else >Next</vs-button>
    </div>
    <!-- Feedback View -->
    <div v-else>
      <h2>Feedback</h2>
      <feedback :feedback="currentSection.feedback" />
      <vs-button
        flat
        :active="true"
        @click="nextQuestion()"
        class="submit"
        v-if="!isLastSection"
      >Next Section</vs-button>
      <div v-else>DONE QUIZ</div>
    </div>
    <!-- DEBUG DATA -->
    <!-- <br />
    {{currentSection}} -->
    </transition>
  </main>
</template>

<script>
export default {
  async asyncData(context) {
    const learnSections = await context
      .$content("learn")
      .only(["questions", "feedback"])
      .fetch();

    return {
      sections: learnSections,
      currentIndex: {
        section: 0,
        question: 0,
      },
      showAnswer: false,
    };
  },
  methods: {
    nextQuestion() {
      // const this.currentSection.questions.length

      if (this.showFeedback) {
        this.currentIndex.question = 0;
        this.currentIndex.section++;
      } else {
        this.currentIndex.question++;
        this.showAnswer = false;
      }
    },
  },
  computed: {
    currentSectionNumber() {
      return this.currentIndex.section + 1;
    },
    currentSection() {
      return this.sections[this.currentIndex.section];
    },
    currentQuestion() {
      return this.currentSection.questions[this.currentIndex.question];
    },
    showFeedback() {
      return this.currentSection.questions.length <= this.currentIndex.question;
    },
    isLastSection() {
      return this.sections.length - 1 <= this.currentIndex.section;
    },
  },
};
</script>

<style>
</style>