<template>
  <div id="learn-container"  class="container" :class="{dark: showFeedback || moduleComplete}">
    <learn-background :accent="showFeedback || moduleComplete" />

    <transition name="slide-fade" mode="out-in">
      <learn-title :key="currentIndex.section" class="space-2">{{currentSectionNumber}} /</learn-title>
    </transition>
    <!-- Question View -->
    <transition name="slide-fade" mode="out-in">
      <div class="question" v-if="!showFeedback && !moduleComplete" key="1">
        <transition name="slide-fade" mode="out-in">
          <div class="center grid">
            <vs-row>
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="5">
                <div class="actual-question" :key="currentIndex.question">
                  <learn-question :question="currentQuestion.question" class="space-1" />
                  <learn-input
                    class="space-2"
                    :type="currentQuestion.type"
                    :answers="currentQuestion.answers"
                    :reveal-answer="showAnswer"
                  />

                  <vs-button flat border @click="showAnswer = true" v-if="!showAnswer">Submit</vs-button>
                  <vs-button
                    flat
                    :border="!isLastQuestion"
                    :active="isLastQuestion"
                    @click="nextScreen"
                    v-else
                  >Next</vs-button>
                </div>
              </vs-col>
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="4" offset="1">
                <transition name="fade">
                  <question-feedback v-if="showAnswer" :feedback="currentQuestion" />
                </transition>
              </vs-col>
            </vs-row>
          </div>
        </transition>
      </div>
      <!-- Feedback View -->
      <div v-else-if="showFeedback && !moduleComplete" key="2">
        <h2>Feedback</h2>
        <section-feedback :feedback="currentFeedback" />
        <vs-button
          flat
          dark
          border
          :active="true"
          @click="nextScreen()"
          class="submit"
        >{{isLastFeedback ? 'Next Section' : 'Next'}}</vs-button>
      </div>
      <div v-else key="3">
        <section-feedback :feedback="finalPage"/>
        <!-- Quiz Demo Buttons (Temporary) -->
        <div>
          <button @click="currentIndex = { section: 0, question: 0, feedback: 0}">Restart</button>
        </div>
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
    DEBUG DATA
    {{sections[0]}}-->
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Learn",
    };
  },
  async asyncData(context) {
    // Get content from flatfiles in ~/content/ folder

    const finalPage = await context.$content("learn/final").fetch();

    const flatQuestions = await context
      .$content("learn/sections", { deep: true })
      .sortBy("dir")
      .sortBy("slug")
      // .only(["questions", "feedback", "body"])
      .fetch();

    // Organize questions into their parent sections
    const learnSections = flatQuestions.reduce((acc, obj) => {
      const property = obj["dir"]; // Sort all the quetsions into their parent directories (their sections)

      acc[property] = acc[property] || {}; // Create new sub object if it doesn't already exist

      // If the slug is feedback (for end-of-section feedback) add it to the feedback key,
      // If not, it must be a question so add it to the array of questions
      if (obj.slug.startsWith("feedback")) {
        acc[property].feedback = acc[property].feedback || [];
        acc[property].feedback.push(obj);
      } else if (obj.slug.startsWith("question")) {
        acc[property].questions = acc[property].questions || [];
        acc[property].questions.push(obj);
      }

      return acc;
    }, {});

    // Convert to array
    const learnSectionsArray = Object.values(learnSections);

    // Return data object complete with learning module sections
    return {
      sections: learnSectionsArray,
      finalPage: finalPage,
      currentIndex: {
        section: 0,
        question: 0,
        feedback: 0,
      },
      showAnswer: false,
    };
  },
  methods: {
    // Progresses the user through the learning module
    nextScreen() {
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
        this.showAnswer = false;
      }
    },
  },
  computed: {
    currentSectionNumber() {
      return this.currentIndex.section + 1;  // One number larger than the index because nerds start at 0 instead of 1
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
      return (
        this.sections.length <= this.currentIndex.section
      );
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
  },
};
</script>

<style scoped lang="scss">
#learn-container {
  overflow: hidden;
}
.learn-progress-container {
  position: absolute;
  bottom: 2em;
  left: 0;
  width: 100%;

  > .learn-progress-wrapper {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>