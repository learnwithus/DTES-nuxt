<template>
  <div>
    <textarea
      v-model="text"
      :disabled="revealAnswer"
      rows="6"
      cols="50"
      @input="$emit('user-answered', $event.target.value)"
      aria-label="Free text input"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: ["answers", "revealAnswer", "value"],
  data() {
    return {
      text: this.value ?? "",
    };
  },
  watch: {
    text(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  resize: none;
  border-radius: 5px;
  border: 1px solid $colour-light;
  padding: 1em;
  box-sizing: border-box;
  width: 100%;

  &:disabled {
    border: 1px solid rgba(255, 255, 255, 0);
    background: none;
    opacity: 1;
    color: $text-colour-dark;
  }
}
.free-text-answer {
  color: $colour-accent;
}
</style>