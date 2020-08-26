<template>
  <multiple-choice v-if="type == 'multiple-choice'" :answers="answers" :reveal-answer="revealAnswer" />
  <free-text v-else-if="type == 'free-text'" :answers="answers" :reveal-answer="revealAnswer"/>
</template>

<script>
export default {
    props: ["type", "answers", "revealAnswer"]
}
</script>

<style>

</style>