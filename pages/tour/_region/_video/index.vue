<template>
  <div>
    <div class="video-intro-page">
      <div class="container video-container">
        <div class="video-info">
          <img
            class="profile"
            :src="require(`~/assets/tour/${video.profile}`)"
            :alt="`An image of ${video.name}`"
          />
          <h3>{{ video.name }}</h3>
          <div class="video-type">{{ videoType }}</div>
          <p>{{ video.bio }}</p>
          <vs-button
            :to="`/tour/${video.region}/${video.slug}/watch`"
            flat
            border
            color="#fff"
            class="watch-button"
            >Watch</vs-button
          >
        </div>
        <tour-minimap class="video-map" :location="video.slug" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
      link: [
        {
          rel: "preload",
          href: require(`~/assets/tour/${this.video.poster}`),
          as: "image",
        },
      ],
    };
  },
  async asyncData({ params, store }) {
    const video = store.getters.getVideoBySlug(params.video);

    store.commit("setBackgroundImage", `tour/${video.background}`);

    return {
      video,
    };
  },
  mounted() {},
  computed: {
    videoType() {
      if (this.video.type.toLowerCase() == "peer") {
        return "Peer";
      } else return "Organization";
    },
    ...mapGetters([]),
  },
};
</script>

<style scoped lang="scss">
.video-container {
  align-items: flex-end;
  justify-content: space-between;
  min-height: calc(100% - 5em);
  padding-bottom: 5em;
  text-align: center;
  font-size: 0.9em;

  @include breakpoint(phone) {
    font-size: 1em;
  }

  @include breakpoint(tablet) {
    display: flex;
  }
}

.profile {
  width: 8em;
  border-radius: 50%;

  @include breakpoint(phone) {
    width: 10em;
  }
}

.video-intro-page {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  // .container {
  //   position: relative;
  // }
}

.video-info {
  align-self: start;
  color: white;
  background: rgba(0, 0, 0, 0.75);
  display: inline-block;
  max-width: 20em;
  text-align: center;
  padding: 2em;
  border-radius: 1em;
  margin-top: 7em;

}

.video-type {
  font-style: oblique;
}

.watch-button {
  margin: 2em auto 0 auto;
  text-transform: uppercase;
  padding: 0.5em;
}

.video-map {
  margin-top: 4em;
}
</style>