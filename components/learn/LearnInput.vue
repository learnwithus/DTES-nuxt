<template>
  <multiple-choice v-if="type == 'multiple-choice'" :answers="answers" :reveal-answer="revealAnswer" @user-answered="userAnswered"/>
  <free-text v-else-if="type == 'free-text'" :answers="answers" :reveal-answer="revealAnswer" @user-answered="userAnswered"/>
  <matching v-else-if="type == 'match'" :answers="answers" :reveal-answer="revealAnswer" @user-answered="userAnswered"/>
</template>

<script>
export default {
    props: ["type", "answers", "revealAnswer"],
    methods: {
      userAnswered(){
        this.$emit('answered', true)
      }
    }
}
</script>

<style>

</style>