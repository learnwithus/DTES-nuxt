<template>
  <main :class="{ dark: darkContent }">
    <div class="container learn-container">
      <learn-background :accent="darkSlide" />

      <!-- Section Number -->
      <transition name="slide-fade" mode="out-in">
        <learn-title
          :key="showVideoSlide ? 'video' : currentQuestion?.questionNumber"
          class="space-2 opacity-show"
          :class="{ 'opacity-hide': !moduleStarted }"
          v-if="!moduleComplete"
          >{{ showVideoSlide ? 'Video' : (currentQuestion?.questionNumber ?? 'Feedback') }} /</learn-title
        >
      </transition>

      <!-- Switch light/dark colours as the next slide enters, so the outgoing slide keeps its own -->
      <transition name="slide-fade" mode="out-in" @before-enter="darkContent = darkSlide">
        <!-- Learning Objectives -->
        <learning-objectives
          v-if="!moduleStarted"
          :learningObjectives="learningObjectives"
        />
        <div v-else-if="showVideoSlide" key="video" class="stigma-video columns">
          <div class="column is-half">
            <v-plyr :hls="currentQuestion.videoHls" class="stigma-video-player">
              <video
                :poster="currentQuestion.videoPoster"
                aria-label="Street Dr Jill video about stigma"
                controls
                playsinline
                preload="metadata"
                @play="currentQuestion.videoPlayed = true"
              >
                <source :src="currentQuestion.video" type="video/mp4" />
              </video>
            </v-plyr>
            <p>Source: <a :href="currentQuestion.videoAttributionUrl" target="_blank" rel="noopener noreferrer">Street Dr Jill on Instagram</a></p>
          </div>
          <!-- Shown when they try to move on without starting the video, like the unanswered-question reminder -->
          <div class="column is-one-third-desktop is-full-mobile">
            <transition name="fade">
              <div v-if="currentQuestion.videoSkipAttempted && !currentQuestion.videoPlayed" class="answer-reminder">
                Don't forget to play the video!
              </div>
            </transition>
          </div>
        </div>
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
                      v-model="currentQuestion.userInput"
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
          :key="`sectionFeedback${currentIndex.feedback}`"
        >
          <h2 v-if="currentFeedback.title !== undefined">
            {{ currentFeedback.title }}
          </h2>
          <section-feedback :feedback="currentFeedback" />
        </div>
        <!-- Final Quiz Page -->
        <div class="section-feedback-wrapper" v-else key="3">
          <section-feedback :feedback="finalPage" />
          <!-- Quiz Demo Buttons (Temporary) -->
          <!-- <div>
            <button
              @click="currentIndex = { section: 0, question: 0, feedback: 0 }"
            >
              Restart
            </button>
          </div> -->
        </div>
      </transition>

      <!-- Bottom Fixed UI -->
      <bottom-ui
        :accent="darkSlide"
        :progress="progressObject"
        :button="uiButton"
        @click-back="previousScreen()"
        @click-next="nextScreen()"
        @click-submit="onAnswerSubmit()"
        @click-start-module="moduleStarted = true"
        @click-start-tour="$router.push({ path: '/tour/intro' })"
      />
    </div>
  </main>
</template>

<script>
import { defineCoursePage } from "~/utils/course-page";
import { courseDocument, courseDocuments } from "~/utils/course-content";
import formatQuestions from "~/helpers/formatLearnQuestions";
export default defineCoursePage({
  head() {
    return {
      title: "Resisting Stigma - Learn",
    };
  },
  loadPage({ store, params }) {
    // Get content from flat files in ~/content/ folder

    const finalPage = courseDocument("learn/final");
    const learningObjectives = courseDocument("learn/objectives");

    const flatQuestions = courseDocuments("learn/sections");

    // Do some complex organizing of the data (check function for details)
    const formattedSections = formatQuestions(flatQuestions);

    // Return data object complete with learning module sections
    return {
      sections: formattedSections,
      finalPage: finalPage,
      learningObjectives: learningObjectives,
      moduleStarted: false,
      darkContent: false,
      videoSlidePassed: false,
      currentIndex: {
        section: 0,
        question: 0,
        feedback: 0,
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    if (!this.moduleComplete && this.moduleStarted) {
      const answer = window.confirm(
        "Do you really want to leave? You will lose your progress in this learning module."
      );
      if (answer) next();
      else next(false);
    } else next();
  },
  methods: {
    // Progresses the user through the learning module
    nextScreen() {
      if (this.showVideoSlide) {
        // The video must be started before moving on; otherwise remind them to play it
        if (!this.currentQuestion.videoPlayed) {
          this.currentQuestion.videoSkipAttempted = true;
          return;
        }
        this.videoSlidePassed = true;
        window.scrollTo(0, 0);
        return;
      }
      this.videoSlidePassed = false;

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
      // If not displaying feedback, increment the question index
      else {
        this.currentIndex.question++;
      }
    },
    // Go back to previous screen
    previousScreen() {
      if (this.currentQuestion?.video && this.videoSlidePassed) {
        this.videoSlidePassed = false;
        window.scrollTo(0, 0);
        return;
      }

      // When stepping back from a later slide, return to the question first.
      this.videoSlidePassed = true;

      // If feedback is being displayed...
      if (this.showFeedback) {
        if (this.currentIndex.feedback > 0) {
          this.currentIndex.feedback--;
        } else if (this.currentSection.questions.length === 0) {
          this.currentIndex = {
            section: this.currentIndex.section - 1,
            question: this.previousSection.questions.length,
            feedback: this.previousSection.feedback.length - 1,
          };
        } else {
          this.currentIndex.question--;
        }
      }
      // If not displaying feedback, decrement the question index
      else {
        if (this.currentIndex.section == 0 && this.currentIndex.question == 0) {
          this.moduleStarted = false;
          this.videoSlidePassed = false;
        } else if (this.currentIndex.question > 0) {
          this.currentIndex.question--;
        } else {
          this.currentIndex = {
            section: this.currentIndex.section - 1,
            question: this.previousSection.questions.length,
            feedback: this.previousSection.feedback.length - 1,
          };
        }
      }
    },
    onUserAnswered() {
      this.currentQuestion.userAnsweredQuestion = true;
      this.currentQuestion.userRequestedAnswer = false;
    },
    onAnswerSubmit() {
      this.currentQuestion.userRequestedAnswer = true;
    },
  },
  computed: {
    currentSectionNumber() {
      return this.currentIndex.section + 1; // One number larger than the index because nerds start at 0 instead of 1
    },
    currentSection() {
      return this.sections[this.currentIndex.section];
    },
    previousSection() {
      return this.currentIndex.section > 0
        ? this.sections[this.currentIndex.section - 1]
        : undefined;
    },
    currentQuestion() {
      return this.currentSection?.questions[this.currentIndex.question];
    },
    currentFeedback() {
      console.log({
        "this.currentIndex.feedback": this.currentIndex.feedback,
        "this.currentSection?.feedback": this.currentSection?.feedback,
        "this.currentSection?.feedback[this.currentIndex.feedback]": this
          .currentSection?.feedback[this.currentIndex.feedback],
      });
      return this.currentSection?.feedback[this.currentIndex.feedback];
    },
    darkSlide() {
      return this.showFeedback || this.moduleComplete;
    },
    showVideoSlide() {
      return this.moduleStarted && !!this.currentQuestion?.video && !this.videoSlidePassed;
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
        lastSectionQuestion: !this.showVideoSlide && this.isLastQuestion,
      };
    },
    // Returns the type of button we should be displaying based on the current state of things
    uiButton() {
      if (!this.moduleStarted) {
        return "start-module";
      } else if (this.showVideoSlide) {
        return "question-next";
      } else if (!this.showAnswer && !this.showFeedback && !this.moduleComplete)
        return "question-submit";
      else if (this.showAnswer && !this.showFeedback && !this.moduleComplete)
        return "question-next";
      else if (this.isLastFeedback) return "feedback-next-section";
      else if (this.moduleComplete) return "start-tour";
      else return "feedback-next-feedback";
    },
    userRequestedAnswer() {
      return this.currentQuestion?.userRequestedAnswer;
    },
    userAnsweredQuestion() {
      return this.currentQuestion?.userAnsweredQuestion;
    },
    showAnswer() {
      return this.userRequestedAnswer && this.userAnsweredQuestion;
    },
  },
});
</script>

<style scoped lang="scss">
.stigma-video-player {
  width: min(360px, 100%, 36svh);
  margin-bottom: 0.5rem;
}

.stigma-video-player :deep(video) {
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: contain;
}

.learn-container {
  overflow: hidden;
  padding-top: 2em;
  padding-bottom: 9em;

  @include breakpoint(phablet) {
    padding-bottom: 7em;
  }

  @include breakpoint(tablet) {
    padding-bottom: 6em;
  }
}

.answer-reminder {
  color: $colour-primary;
}
</style>
