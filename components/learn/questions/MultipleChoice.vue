<template>
  <div class="answers">
    <vs-radio
      v-model="selectedAnswer"
      v-for="(answer, index) in answers"
      v-bind:key="index"
      :class="{correct: revealAnswer && answer.correct, incorrect: revealAnswer && !answer.correct}"
      :disabled="revealAnswer"
      :val="index"
    >{{answer.answer}}</vs-radio>
  </div>
</template>

<script>
export default {
    props: [ "answers", "revealAnswer" ],
    data(){
        return {
            selectedAnswer: 0
        }
    }
};
</script>

<style lang="scss">
.correct {
    color: $colour-accent;
    opacity: 1 !important;
    font-weight: bold;
}

.incorrect {
    opacity: 0.2 !important;
}

.answers {
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>