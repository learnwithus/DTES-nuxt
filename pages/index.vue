<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section">First section ...</div>
    <div class="section">Second section ...</div>
  </full-page>
</template>

<script>
export default {
  data(){
    return {
      options: {
        navigation: true,
      }
    }
  }
};
</script>

<style>

</style>
