<template>
  <div class="answers">
    <vs-radio
      v-model="selectedAnswer"
      v-for="(answer, index) in answers"
      v-bind:key="index"
      :class="{correct: revealAnswer && answer.correct}"
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
    color: green;
    opacity: 1 !important;
}
</style>