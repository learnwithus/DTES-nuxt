<template>
  <div>
    <div class="container skinny">
      <!-- <h1>Walk</h1> -->
      <h2 class="title">All Videos</h2>
      <!-- Peers -->
      <h3>Peers</h3>
      <ul class="video-list">
        <li class="video" v-for="peer in [...peers].sort((a, b) => a.name.localeCompare(b.name))" v-bind:key="peer.id">
          <nuxt-link :to="`/tour/${peer.region}/${peer.slug}`"
            ><img
              class="profile"
              :alt="`An image of ${peer.name}`"
              :src="assetUrl(`tour/${peer.profile}`)" loading="lazy"
            />
            <figcaption>{{ peer.name }}</figcaption>
          </nuxt-link>
        </li>
      </ul>
      <!-- Services -->
      <h3>Services</h3>
      <ul class="video-list">
        <li class="video" v-for="service in [...services].sort((a, b) => a.name.localeCompare(b.name))" v-bind:key="service.id">
          <nuxt-link :to="`/tour/${service.region}/${service.slug}`"
            ><img
              class="profile"
              :alt="`An image of ${service.name}`"
              :src="assetUrl(`tour/${service.profile}`)" loading="lazy"
            />
            <figcaption>{{ service.name }}</figcaption>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { assetUrl } from "~/utils/asset-url";
import { defineCoursePage } from "~/utils/course-page";
import { mapGetters } from "vuex";
export default defineCoursePage({
  methods: { assetUrl },
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  loadPage({ store, params }) {
  },
  computed: {
    ...mapGetters(["services", "peers"]),
  },
});
</script>

<style lang="scss" scoped>
.video {
  width: 9.7em;
}
.profile {
  width: 100%;
  border-radius: 50%;
  background-color: $colour-light;

  @include breakpoint(phone) {
  }
}

.title {
  font-family: $font-serif;
  text-align: center;
  letter-spacing: 0.05em;
  margin-top: 2em;
}

.video-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;

  @include breakpoint(thone) {
    justify-content: flex-start;
  }

  figcaption {
    text-align: center;
  }

  li {
    margin: 1em;
  }

  a {
  }
}

a {
  border-bottom: none;
}
</style>
