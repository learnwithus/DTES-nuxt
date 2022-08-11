<template>
  <TourMap :hover-location="hoverLocation" region="coastal" title="Coastal" :land-acknowledgement="landAcknowledgement">
    <TourMapCoastal  @hover="e => hoverLocation = e"/>
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
        ...this.coastalVideos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.profile}`),
          as: "image",
        })),
        ...this.coastalVideos.map((video) => ({
          rel: "preload",
          href: require(`~/assets/tour/${video.background}`),
          as: "image",
        })),
      ],
    };
  },
  async asyncData({ redirect, store, $content }) {
    store.commit("requestDarkBackground");

    const {body: landAcknowledgement} = await $content('tour/coastal/land-acknowledgement').fetch();

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
};
</script>

<style lang="scss" scoped>

</style>