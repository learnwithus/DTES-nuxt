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
      <div class="learn-progress-wrapper">
        <progress-dots
          class="is-hidden-mobile"
          :sections="progress.sectionCount"
          :current-section="progress.progress"
          :progress="progress.sectionProgress"
        />
      </div>
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
  position: absolute;

  bottom: 2em;
  left: 0;
  width: 100%;

  .container {
    display: flex;
    align-items: center;
  }

  .learn-progress-wrapper {
    min-width: 300px;
    margin: 0 auto;
  }
}
</style>