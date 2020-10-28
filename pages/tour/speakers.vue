<template>
  <div>
    <div class="container">
      <h1>Walk</h1>
      <h2>All Speakers</h2>
      <ul id="speaker-list">
        <li v-for="speaker in speakers" v-bind:key="speaker.id">
          <nuxt-link :to="`/tour/${speaker.slug}`"
            ><img
              class="profile"
              :alt="`An image of ${speaker.name}`"
              v-lazy="{src: require(`~/assets/tour/${speaker.profile}`), preLoad: 1}"
            />
            <figcaption>{{ speaker.name }}</figcaption>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
    };
  },
  async asyncData({ $content, params, store }) {
    const speakers = await $content("tour/speakers").fetch();

    return {
      speakers,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 10em;
  // height: 10em;
  border-radius: 50%;
  background-color: $colour-light;
}

#speaker-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;

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