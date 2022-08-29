<template>
  <TourMap :hover-location="hoverLocation" region="dtes" title="DTES" :land-acknowledgement="landAcknowledgement">
    <TourMapDTES @hover="e => hoverLocation = e" />
  </TourMap>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
      // Preload the videos profile pictures and background images so the user doesn't have to wait when they click on them
      link: [
        ...this.dtesVideos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.profile}`),
          as: "image",
        })),
        ...this.dtesVideos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.background}`),
          as: "image",
        })),
      ],
    };
  },
  async asyncData({ redirect, store, $content }) {
    store.commit("requestDarkBackground");

    const {body: landAcknowledgement} = await $content('tour/dtes/land-acknowledgement').fetch();

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
};
</script>

<style lang="scss" scoped>

</style>