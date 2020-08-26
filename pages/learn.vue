<template>
  <main :class="{dark: showFeedback}">
    <learn-background :accent="showFeedback" />
    <transition name="slide-fade" mode="out-in">
      <learn-title :key="currentIndex.section" class="space-2">{{currentSectionNumber}} /</learn-title>
    </transition>
    <!-- Question View -->
    <transition name="slide-fade" mode="out-in">
      <div class="question" v-if="!showFeedback" key="1">
        <transition name="slide-fade" mode="out-in">
          <div class="actual-question" :key="currentIndex.question">
            <learn-question :question="currentQuestion.question" class="space-1" />
            <learn-input
              :type="currentQuestion.type"
              :answers="currentQuestion.answers"
              :reveal-answer="showAnswer"
            />
            <vs-button flat :active="true" @click="showAnswer = true" v-if="!showAnswer">Submit</vs-button>
            <vs-button flat :active="true" @click="nextQuestion" v-else>Next</vs-button>
          </div>
        </transition>
      </div>
      <!-- Feedback View -->
      <div v-else key="2">
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
    </transition>

    <div class="learn-progress-container">
      <div class="learn-progress-wrapper">
        <progress-dots
          :sections="sections.length"
          :current-section="currentSectionNumber"
          :progress="sectionProgress"
        />
      </div>
    </div>

    <!-- DEBUG DATA -->
    <!-- <br />
    {{currentSection}}-->
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
    sectionProgress() {
      const progress =
        this.currentIndex.question / this.currentSection.questions.length;

      return progress * 100;
    },
  },
};
</script>

<style scoped lang="scss">
main {
  padding: 2em;
  overflow: hidden;
}
.learn-progress-container {
  position: absolute;
  bottom: 2em;
  left: 0;
  width: 100%;

  >.learn-progress-wrapper {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>