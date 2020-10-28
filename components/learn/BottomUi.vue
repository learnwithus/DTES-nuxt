<template>
  <div class="bottom-fixed-ui">
    <dir class="container">
      <!-- Buttons -->
      <div class="button-wrapper">
        <vs-button
          flat
          border
          @click="$emit('click-submit')"
          v-if="button == 'question-submit'"
          >Submit</vs-button
        >
        <vs-button
          flat
          :border="!isLastQuestion"
          :active="isLastQuestion"
          @click="$emit('click-next')"
          v-else-if="button == 'question-next'"
          >Next</vs-button
        >
        <vs-button
          flat
          dark
          border
          :active="true"
          v-else-if="
            button == 'feedback-next-section' ||
            button == 'feedback-next-feedback'
          "
          @click="$emit('click-next')"
          class="submit"
          >{{
            button == "feedback-next-section" ? "Next Section" : "Next"
          }}</vs-button
        >
      </div>

      <!-- Prgoress Dots -->
      <div class="learn-progress-wrapper is-hidden-mobile">
        <progress-dots
          :sections="progress.sectionCount"
          :current-section="progress.progress"
          :progress="progress.sectionProgress"
        />
      </div>
      <div class="is-hidden-mobile"></div>
    </dir>
  </div>
</template>

<script>
export default {
  props: {
    button: {
      // 'question-submit' || 'question-next' || 'feedback-next-section' || 'feedback-next-feedback'
      type: String,
      required: true,
    },
    progress: {
      type: Object,
      required: true,
      //   {
      //       sectionCount: 5, // How many sections
      //       currentSection: 3, // Which section / dot we're on
      //       sectionProgress: 40: // Percentage progress bewteen sections / dots
      //   }
    },
  },
};
</script>

<style lang="scss">
.bottom-fixed-ui {
  position: fixed;
  bottom: 0;
  padding-bottom: 2em;
  padding-top: 5em;
  left: 0;
  width: 100%;

//   background: linear-gradient(
//     0deg,
//     rgba($colour-primary-dark, 1) 0%,
//     rgba($colour-primary-dark, 0.10686281348476889) 82%,
//     rgba($colour-primary-dark, 0) 100%
//   );

  background: linear-gradient(
    0deg,
    rgba(white, 1) 0%,
    rgba(white, 0.5) 82%,
    rgba(white, 0) 100%
  );

  @include breakpoint(phablet) {
      padding-top: 0;
    background: unset;
  }

  .container {
    display: flex;
    align-items: center;

    > * {
      flex-grow: 1;
      flex-basis: 0;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    @include breakpoint(phablet) {
      justify-content: unset;
    }
  }

  .learn-progress-wrapper {
    min-width: 300px;
    margin: 0 auto;
  }
}
</style>