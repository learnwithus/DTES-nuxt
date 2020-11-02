<template>
  <div class="bottom-fixed-ui">
    <dir class="container">
      <!-- Buttons -->
      <div class="button-wrapper">
        <vs-button
          flat
          size="large"
          border
          @click="$emit('click-start-module')"
          v-if="button == 'start-module'"
          >Begin Module</vs-button
        >
        <vs-button
          flat
          size="large"
          border
          @click="$emit('click-submit')"
          v-else-if="button == 'question-submit'"
          >Submit</vs-button
        >
        <vs-button
          flat
          size="large"
          :border="!progress.lastSectionQuestion"
          :active="progress.lastSectionQuestion"
          @click="$emit('click-next')"
          v-else-if="button == 'question-next'"
          >Next</vs-button
        >
        <vs-button
          flat
          size="large"
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
      <div class="learn-progress-wrapper is-hidden-mobile opacity-show" :class="{'opacity-hide': !$props.progress.show}">
        <progress-dots
          :sections="progress.sectionCount"
          :current-section="progress.currentSection"
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
      //       show: true, //whether or now we show the prgress
      //       sectionCount: 5, // How many sections
      //       currentSection: 3, // Which section / dot we're on
      //       sectionProgress: 40: // Percentage progress bewteen sections / dots
      //   }
    },
  },
  mounted() {
    console.log(this.$props.progress);
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
  transition: all 200ms linear 200ms;
  z-index: 2;
  pointer-events: none;

  @include breakpoint(phablet) {
    padding-bottom: 3em;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: linear-gradient(
      0deg,
      rgba($colour-primary, 1) 0%,
      rgba($colour-primary, 0.75) 80%,
      rgba($colour-primary, 0) 100%
    );

    .dark & {
      opacity: 1;
      transition: opacity 200ms linear 250ms;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: opacity 200ms linear 250ms;
    background: linear-gradient(
      0deg,
      rgba(white, 1) 0%,
      rgba(white, 0.75) 80%,
      rgba(white, 0) 100%
    );

    @include breakpoint(phablet) {
      background: unset;
    }

    .dark & {
      opacity: 0;
      transition: none;
    }
  }

  .dark & {
    // background: linear-gradient(
    //   0deg,
    //   rgba($colour-primary, 1) 0%,
    //   rgba($colour-primary, 0.5) 50%,
    //   ≈
    //   rgba($colour-primary, 0) 100%
    // );
  }

  @include breakpoint(phablet) {
    padding-top: 0;
    background: unset;
  }

  .container {
    display: flex;
    align-items: center;
    pointer-events: auto;

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
    transition: opacity linear 200ms;
  }
}
</style>