<template>
  <TourMap :hover-location="hoverLocation" region="coastal" title="Coastal & Richmond" :land-acknowledgement="landAcknowledgement">
    <TourMapCoastal  @hover="e => hoverLocation = e"/>
  </TourMap>
</template>

<script>
import { assetUrl } from "~/utils/asset-url";
import { defineCoursePage } from "~/utils/course-page";
import { courseDocument } from "~/utils/course-content";
import { mapGetters } from "vuex";

export default defineCoursePage({
  head() {
    return {
      title: "Resisting Stigma - Tour",
      // Preload the videos profile pictures and background images so the user doesn't have to wait when they click on them
      link: [
        ...this.coastalVideos.map((video) => ({
          rel: "preload",
          href: assetUrl(`tour/${video.profile}`),
          as: "image",
        })),
        ...this.coastalVideos.map((video) => ({
          rel: "preload",
          href: assetUrl(`tour/${video.background}`),
          as: "image",
        })),
      ],
    };
  },
  loadPage({ store, params }) {

    const {body: landAcknowledgement} = courseDocument('tour/coastal/land-acknowledgement');

    return {
      hoverLocation: null,
      landAcknowledgement
    };
  },
  mounted() {

  },
  computed: {
    ...mapGetters([
      "userProgress",
      "tourVideoRequirement",
      "tourComplete",
      "coastalVideos",
    ]),
  },
  methods: {

  },
});
</script>

<style lang="scss" scoped>

</style>