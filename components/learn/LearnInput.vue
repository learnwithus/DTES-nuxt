<template>
  <multiple-choice
    v-if="type == 'multiple-choice'"
    :answers="answers"
    :reveal-answer="revealAnswer"
    @user-answered="userAnswered"
    v-model="model"
  />
  <free-text
    v-else-if="type == 'free-text'"
    :answers="answers"
    :reveal-answer="revealAnswer"
    @user-answered="userAnswered"
    v-model="model"
  />
  <matching
    v-else-if="type == 'match'"
    :answers="answers"
    :reveal-answer="revealAnswer"
    @user-answered="userAnswered"
    v-model="model"
  />
</template>

<script>
export default {
  props: ["type", "answers", "revealAnswer", "value"],
  data() {
    return {
      model: this.value,
    };
  },
  methods: {
    userAnswered() {
      this.$emit("answered", true);
    },
  },
  watch: {
    model(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style>
</style>