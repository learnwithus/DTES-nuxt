<template>
  <div>
    <div class="video-intro-page">
      <div class="container video-container">
        <div class="video-info">
          <img
            class="profile"
            v-bind="responsiveImage($img, `tour/${video.profile}`, 'profile')"
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
        <tour-minimap :region="region" class="video-map" :location="video.slug" />
      </div>
    </div>
  </div>
</template>

<script>
import { responsiveImage, singleImage } from "~/utils/responsive-image";
import { defineCoursePage } from "~/utils/course-page";
import { mapGetters } from "vuex";
export default defineCoursePage({
  methods: { responsiveImage },
  head() {
    return {
      title: "Resisting Stigma - Tour",
      link: [
        {
          rel: "preload",
          href: singleImage(this.$img, `tour/${this.video.poster}`, "poster"),
          as: "image",
        },
      ],
    };
  },
  loadPage({ store, params }) {
    const video = store.getters.getVideoBySlug(params.video);
    if (!video || video.region !== params.region) throw createError({ statusCode: 404, statusMessage: "Video not found" });
    const region = params.region;


    return {
      video,
      region
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
});
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

    @supports (backdrop-filter: blur(8px)) {
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.6);
  }

}

// Ease the card and minimap in once the page appears, after the background starts crossfading
.video-info,
.video-map {
  // `backwards`, not `both`: a transform left on .video-map after the animation would trap the
  // minimap's position: fixed full-screen map overlay inside the minimap box.
  animation: video-intro-rise 600ms cubic-bezier(0.22, 1, 0.36, 1) backwards;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
}
.video-info {
  animation-delay: 150ms;
}
.video-map {
  animation-delay: 300ms;
}
@keyframes video-intro-rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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