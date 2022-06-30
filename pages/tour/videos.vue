<template>
  <div>
    <div class="container skinny">
      <!-- <h1>Walk</h1> -->
      <h2 class="title">All Videos</h2>
      <!-- Peers -->
      <h3>Peers</h3>
      <ul class="video-list">
        <li v-for="peer in peers" v-bind:key="peer.id">
          <nuxt-link :to="`/tour/${peer.region}/${peer.slug}`"
            ><img
              class="profile"
              :alt="`An image of ${peer.name}`"
              v-lazy="{
                src: require(`~/assets/tour/${peer.profile}`),
                preLoad: 1,
              }"
            />
            <figcaption>{{ peer.name }}</figcaption>
          </nuxt-link>
        </li>
      </ul>
      <!-- Services -->
      <h3>Services</h3>
      <ul class="video-list">
        <li v-for="service in services" v-bind:key="service.id">
          <nuxt-link :to="`/tour/${service.region}/${service.slug}`"
            ><img
              class="profile"
              :alt="`An image of ${service.name}`"
              v-lazy="{
                src: require(`~/assets/tour/${service.profile}`),
                preLoad: 1,
              }"
            />
            <figcaption>{{ service.name }}</figcaption>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ $content, params, store }) {
    store.commit("requestDarkBackground");
  },
  computed: {
    ...mapGetters(["services", "peers"]),
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 9.7em;
  // height: 10em;
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
