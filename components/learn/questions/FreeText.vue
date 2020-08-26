<template>
  <!-- <vs-input v-model="value" placeholder="Name" /> -->
  <textarea v-model="text" :disabled="revealAnswer"></textarea>
</template>

<script>
export default {
  props: ["answers", "revealAnswer"],
  data(){
      return {
          text: ''
      }
  },
  watch: {
      revealAnswer(value){
          if(value){
              this.text = this.answers
          }
      }
  }
};
</script>

<style>
</style>