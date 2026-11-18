<template>
  <div>
    <div class="container skinny pb-6">
      <h1 class="light-page-title">Resources</h1>
      <nuxt-content :document="resources" class="light-page-content"/>
      </div>
  </div>
</template>

<script>
import { defineCoursePage } from "~/utils/course-page";
import { courseDocument } from "~/utils/course-content";
export default defineCoursePage({
  head() {
    return {
      title: "Resisting Stigma - Resources",
    };
  },
  loadPage() {
        const resources = courseDocument("resources");

        return {
            resources
        }
    }
});
</script>

<style>
</style>