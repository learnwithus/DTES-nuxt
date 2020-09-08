<template>
  <!-- <vs-input v-model="value" placeholder="Name" /> -->
  <div>
    <textarea v-model="text" :disabled="revealAnswer" rows="5" cols="50"></textarea>
    <!-- <div class="free-text-answer" v-if="revealAnswer">{{answers}}</div> -->
  </div>
</template>

<script>
export default {
  props: ["answers", "revealAnswer"],
  data() {
    return {
      text: "",
    };
  },
  watch: {
    // revealAnswer(value) {
    //   if (value) {
    //     this.text = this.answers;
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
textarea{
    resize: none;
    border-radius: 5px;
    border: 1px solid $colour-light;
    padding: 1em;
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