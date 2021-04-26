<template>
  <div class="container mt-6">
    <h1>Tour</h1>
    <div class="columns is-variable is-8">
      <div class="column">
        <h2>Welcome to the Tour</h2>
        <p>
          The community of the DTES is multi-cultural, with many residents
          connected to culturally diverse communities and histories, including
          the Chinatown district, as well as the histories of Japanese residents
          in Oppenheimer, prior to World War II and the devastation of the
          internment camps.
        </p>
        <p>
          While the community is located on Coast Salish territories, the DTES
          has a higher proportion of Indigenous people than other communities
          within Vancouver, and includes Indigenous people from across North
          America. While recognized for poverty, homelessness, substance use,
          the DTES also needs to be acknowledged for their multi-cultural,
          inter-connected communities that care for each other.
        </p>
        <p>
          The project provides a tour of some of the community-based services in
          the DTES, and shares video interviews with community members who have
          been impacted by stigma.
        </p>
      </div>
      <div class="column">
        <h2>HOW TO NAVIGATE</h2>
        <ul class="intro-tour-instructions">
          <li>
            <img
              src="~assets/images/icons/click.svg"
              alt="Mouse Pointer Icon"
            />
            Click on the spots on the map to visit the peer or service and
            listen to their story. Listen to 3 stories before finishing.
          </li>
          <li>
            <img
              src="~assets/images/icons/desktop.svg"
              alt="Desktop Computer Icon"
            />
            Best experienced on desktop.
          </li>
          <li>
            <img
              src="~assets/images/icons/headphones.svg"
              alt="Headphones Icon"
            />
            Make sure sound is on.
          </li>
        </ul>
      </div>
    </div>
    <vs-button size="large" border color="#ffffff" to="/tour/intro/watch">Watch Intro Video</vs-button>
    <br />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Resisting Stigma - Tour",
      link: [
        {
          rel: "preload",
          href: require(`~/assets/tour/${this.intro.poster}`),
          as: "image",
        },
      ],
    };
  },
  async asyncData({ $content, params, store }) {
    store.commit("requestDarkBackground");
    store.commit("setBackgroundImage", `images/tourintrobg.jpg`);

    const intro = await $content("tour/intro").fetch();

    return {
      intro,
    };
  },
  mounted() {
    this.$store.commit("beginTour");
  },
};
</script>

<style lang="scss">
.intro-tour-instructions {
  list-style: none;
  padding: 0;

  img {
    width: 20%;
    max-width: 4em;
    display: block;
    margin-bottom: 1em;
  }

  li {
    margin-bottom: 3em;

    @include breakpoint(phone) {
      display: flex;

      img {
        margin-right: 2em;
      }
    }
  }
}
</style>