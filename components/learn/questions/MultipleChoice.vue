<template>
  <div class="answers">
    <vs-radio
      v-model="selectedAnswer"
      v-for="(answer, index) in answers"
      v-bind:key="index"
      :val="index"
    >{{answer.answer}}</vs-radio>
  </div>
</template>

<script>
export default {
    props: [ "answers" ],
    data(){
        return {
            selectedAnswer: 0
        }
    }
};
</script>

<style>
</style>