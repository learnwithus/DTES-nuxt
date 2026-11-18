<template>
  <TourMap :hover-location="hoverLocation" region="dtes" title="DTES" :land-acknowledgement="landAcknowledgement">
    <TourMapDTES @hover="e => hoverLocation = e" />
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
        ...this.dtesVideos.map((video) => ({
          rel: "preload",
          href: assetUrl(`tour/${video.profile}`),
          as: "image",
        })),
        ...this.dtesVideos.map((video) => ({
          rel: "preload",
          href: assetUrl(`tour/${video.background}`),
          as: "image",
        })),
      ],
    };
  },
  loadPage({ store, params }) {

    const {body: landAcknowledgement} = courseDocument('tour/dtes/land-acknowledgement');

    return {
      hoverLocation: null,
      landAcknowledgement,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "userProgress",
      "tourVideoRequirement",
      "tourComplete",
      "dtesVideos",
    ]),
  },
  methods: {},
});
</script>

<style lang="scss" scoped>

</style>