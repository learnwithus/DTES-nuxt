<template>
  <div>
    <div class="container skinny pb-6">
      <h1 class="light-page-title">About</h1>
      <nuxt-content :document="about" class="light-page-content"/>
    </div>
  </div>
</template>

<script>
import { defineCoursePage } from "~/utils/course-page";
import { courseDocument } from "~/utils/course-content";
export default defineCoursePage({
  head() {
    return {
      title: "Resisting Stigma - About",
    };
  },
  loadPage({ store, params }) {
    const about = courseDocument("about");

    return {
      about,
    };
  },
});
</script>

<style lang="scss">

</style>