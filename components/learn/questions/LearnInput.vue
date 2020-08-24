<template>
  <multiple-choice v-if="type == 'multiple-choice'" :answers="answers" />
  <multiple-choice v-else-if="type == 'free-text'" />
</template>

<script>
export default {
    props: ["type", "answers"]
}
</script>

<style>

</style>