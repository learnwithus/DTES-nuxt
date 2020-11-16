<template>
  <div>
    <div class="container">
      <!-- <h1>Walk</h1> -->
      <h2 class="title">All Speakers</h2>
      <!-- Peers -->
      <h3>Peers</h3>
      <ul id="speaker-list">
        <li v-for="peer in peers" v-bind:key="peer.id">
          <nuxt-link :to="`/tour/${peer.slug}`"
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
      <ul id="speaker-list">
        <li v-for="service in services" v-bind:key="service.id">
          <nuxt-link :to="`/tour/${service.slug}`"
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
  width: 10em;
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
}

#speaker-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;

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
