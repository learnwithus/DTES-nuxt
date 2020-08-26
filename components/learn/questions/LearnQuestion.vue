<template>
  <div class="learn-question">{{question}}</div>
</template>

<script>
export default {
  props: ["question"],
};
</script>

<style>
.learn-question {
  font-family: adobe-caslon-pro, serif;
  font-size: 1.5em;
}
</style>