<template>
  <main :class="{ dark: showFeedback || moduleComplete }">
    <div class="container learn-container">
      <learn-background :accent="showFeedback || moduleComplete" />

      <!-- Section Number -->
      <transition name="slide-fade" mode="out-in">
        <learn-title
          :key="currentIndex.section"
          class="space-2 opacity-show"
          :class="{ 'opacity-hide': !moduleStarted }"
          v-if="!moduleComplete"
          >{{ currentSectionNumber }} /</learn-title
        >
      </transition>

      <transition name="slide-fade" mode="out-in">
        <!-- Learning Objectives -->
        <learning-objectives
          v-if="!moduleStarted"
          :learningObjectives="learningObjectives"
        />
        <!-- Question View -->
        <div
          class="question"
          v-else-if="!showFeedback && !moduleComplete && moduleStarted"
          key="1"
        >
          <transition name="slide-fade" mode="out-in">
            <div class="center grid">
              <div class="columns">
                <div
                  class="column"
                  :class="[
                    currentQuestion.type == 'match'
                      ? 'is-10-desktop is-full-tablet'
                      : 'is-half',
                  ]"
                >
                  <div class="actual-question" :key="currentIndex.question">
                    <!-- Questions -->
                    <learn-question
                      :question="currentQuestion.question"
                      class="space-1"
                    />
                    <!-- User Answer Input -->
                    <learn-input
                      class="space-2"
                      :type="currentQuestion.type"
                      :answers="currentQuestion.answers"
                      :reveal-answer="showAnswer"
                      @answered="onUserAnswered()"
                    />
                  </div>
                </div>
                <div
                  class="column is-one-third-desktop is-full-mobile"
                  v-if="currentQuestion.type != 'match'"
                >
                  <!-- Questions-level Feedback -->
                  <transition name="fade">
                    <question-feedback
                      v-if="showAnswer"
                      :feedback="currentQuestion"
                    />
                    <div
                      v-else-if="userRequestedAnswer && !userAnsweredQuestion"
                      class="answer-reminder"
                    >
                      Don't forget to answer the question!
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <!-- Section-level Feedback View -->
        <div
          class="section-feedback-wrapper"
          v-else-if="showFeedback && !moduleComplete"
          key="2"
        >
          <h2>Feedback</h2>
          <section-feedback :feedback="currentFeedback" />
        </div>
        <!-- Final Quiz Page -->
        <div class="section-feedback-wrapper" v-else key="3">
          <section-feedback :feedback="finalPage" />
          <!-- <vs-button to="/tour" dark border flat :active="true">
            Continue To Tour
          </vs-button> -->
          <!-- Quiz Demo Buttons (Temporary) -->
          <div>
            <button
              @click="currentIndex = { section: 0, question: 0, feedback: 0 }"
            >
              Restart
            </button>
          </div>
        </div>
      </transition>

      <!-- Bottom Fixed UI -->
      <bottom-ui
        :progress="progressObject"
        :button="uiButton"
        @click-next="nextScreen()"
        @click-submit="onAnswerSubmit()"
        @click-start-module="moduleStarted = true"
        @click-start-tour="$router.push({ path: '/tour' })"
      />
    </div>
  </main>
</template>

<script>
import formatQuestions from "~/helpers/formatLearnQuestions";
export default {
  head() {
    return {
      title: "Resisting Stigma - Learn",
    };
  },
  async asyncData(context) {
    // Get content from flat files in ~/content/ folder

    const finalPage = await context.$content("learn/final").fetch();
    const learningObjectives = await context
      .$content("learn/objectives")
      .fetch();

    const flatQuestions = await context
      .$content("learn/sections", { deep: true })
      .sortBy("dir")
      .sortBy("slug")
      // .only(["questions", "feedback", "body"])
      .fetch();

    // Do some complex organizing of the data (check function for details)
    const formattedSections = formatQuestions(flatQuestions);

    // Return data object complete with learning module sections
    return {
      sections: formattedSections,
      finalPage: finalPage,
      learningObjectives: learningObjectives,
      moduleStarted: false,
      currentIndex: {
        section: 0,
        question: 0,
        feedback: 0,
      },
      userRequestedAnswer: false,
      userAnsweredQuestion: false,
    };
  },
  beforeDestroy() {
    // Reset
    this.$data.currentIndex = { section: 0, question: 0, feedback: 0 };
    this.$data.moduleStarted = false;
  },
  methods: {
    // Progresses the user through the learning module
    nextScreen() {
      // User has no longer answered the question because we're onto a new screen
      this.userAnsweredQuestion = false;

      // If feedback is being displayed...
      if (this.showFeedback) {
        // If the feedback being shown is the last feedback for that section, move on to the next section
        // If not, show the user the next page of feedback
        if (this.isLastFeedback) {
          this.currentIndex.question = 0;
          this.currentIndex.feedback = 0;
          this.currentIndex.section++;
        } else {
          this.currentIndex.feedback++;
        }
      }
      // If not displaying feedback, increment the question index and hide the answer of the next question
      else {
        this.currentIndex.question++;
        this.userRequestedAnswer = false;
      }
    },
    onUserAnswered() {
      this.userAnsweredQuestion = true;
      this.userRequestedAnswer = false;
    },
    onAnswerSubmit() {
      this.userRequestedAnswer = true;
    },
  },
  computed: {
    currentSectionNumber() {
      return this.currentIndex.section + 1; // One number larger than the index because nerds start at 0 instead of 1
    },
    currentSection() {
      return this.sections[this.currentIndex.section];
    },
    currentQuestion() {
      return this.currentSection?.questions[this.currentIndex.question];
    },
    currentFeedback() {
      return this.currentSection?.feedback[this.currentIndex.feedback];
    },
    showFeedback() {
      return (
        this.currentSection?.questions?.length <= this.currentIndex.question
      );
    },
    moduleComplete() {
      return this.sections.length <= this.currentIndex.section;
    },
    isLastQuestion() {
      return (
        this.currentSection?.questions?.length - 1 <= this.currentIndex.question
      );
    },
    isLastSection() {
      return this.sections.length - 1 <= this.currentIndex.section;
    },
    isLastFeedback() {
      return (
        this.currentSection?.feedback?.length - 1 <= this.currentIndex.feedback
      );
    },
    sectionProgress() {
      const progress =
        this.currentIndex.question /
        (this.currentSection?.questions.length + 1);

      return progress * 100;
    },
    // Progress object passed to Bottom UI
    progressObject() {
      return {
        show: this.moduleStarted,
        sectionCount: this.sections.length,
        currentSection: this.currentSectionNumber,
        sectionProgress: this.sectionProgress,
        lastSectionQuestion: this.isLastQuestion,
      };
    },
    // Returns the type of button we should be displaying based on the current state of things
    uiButton() {
      if (!this.moduleStarted) {
        return "start-module";
      } else if (!this.showAnswer && !this.showFeedback && !this.moduleComplete)
        return "question-submit";
      else if (this.showAnswer && !this.showFeedback && !this.moduleComplete)
        return "question-next";
      else if (this.isLastFeedback) return "feedback-next-section";
      else if (this.moduleComplete) return "start-tour";
      else return "feedback-next-feedback";
    },
    showAnswer() {
      return this.userRequestedAnswer && this.userAnsweredQuestion;
    },
  },
};
</script>

<style scoped lang="scss">
.learn-container {
  overflow: hidden;
  padding-top: 2em;
  padding-bottom: 7em;

  @include breakpoint(phablet) {
    padding-bottom: 4em;
  }
}

.answer-reminder {
  color: $colour-primary;
}
</style>
