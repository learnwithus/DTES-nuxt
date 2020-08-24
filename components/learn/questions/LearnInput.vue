<template>
  <multiple-choice v-if="type == 'multiple-choice'" :answers="answers" :reveal-answer="revealAnswer" />
  <multiple-choice v-else-if="type == 'free-text'" />
</template>

<script>
export default {
    props: ["type", "answers", "revealAnswer"]
}
</script>

<style>

</style>