<template>
  <markdown-container>
    <div class="column is-one-fifth">
      <ul class="columns is-mobile is-multiline is-gapless is-centered">
        <li
          v-for="(section, index) in sections"
          v-bind:key="index"
          class="stigma-level column is-4-mobile is-full-tablet"
          @mousedown="setSection(index)"
          :class="{ active: sectionIndex == index }"
        >
          <img
            :src="require(`~/assets/images/icons/${section.icon}`)"
            :alt="section.alt"
          />
          <p class="name">{{ section.name }}</p>
        </li>
      </ul>
    </div>

    <div class="column">
      <transition name="verticle-slide-fade" mode="out-in">
        <div v-if="sectionIndex == 0" key="0">
          <h3>Individual</h3>
          <ul>
            <li>Self-reflection and further education</li>
            <li>
              <a
                href="https://journals.sagepub.com/doi/pdf/10.1177/0706743717711172"
                target="_blank"
                >Trauma-informed Practice</a
              >
            </li>
            <li>
              <a
                href="https://journals.lww.com/jan/Abstract/2013/04000/Stigmatizing_Harm_Reduction_Through_Language__A.6.aspx"
                target="_blank"
                >Language matters</a
              >
            </li>
            <li>
              Get to know your clients and communities Practising with a
              person-based and evidence-based, not punitive-based, care model
            </li>
            <li>Building authentic and honest relationships with PWUS</li>
          </ul>
        </div>
        <div v-else-if="sectionIndex == 1" key="1">
          <h3>Societal</h3>
          <ul>
            <li>Purposeful media consumption</li>
            <li>Critical analysis of media</li>
            <li>Legislative advocacy</li>
            <li>Awareness campaigns</li>
          </ul>
        </div>
        <div v-else-if="sectionIndex == 2" key="2">
          <h3>Institutional</h3>
          <ul>
            <li>
              Direct involvement of people with lived experience in
              institutional decision making, and compensation for their
              involvement
            </li>
            <li>Ongoing targeted training and education</li>
            <li>Ongoing assessment of policy and practices</li>
            <li>Inclusion of de-stigmatizing programs and services</li>
            <li>Providing outlets for feedback</li>
          </ul>
          <a
            href="http://www.bccdc.ca/resource-gallery/Documents/PEEP%20Best%20Practice%20Guidelines.pdf"
            target="_blank"
            >Source: PEEP Best Practice Guidelines</a
          >
        </div>
        <div v-else key="3">
          <p>Examples of ways to address stigma on each level</p>
          <em>Click on the icons on the left to learn more.</em>
        </div>
      </transition>
    </div>
  </markdown-container>
</template>

<script>
export default {
  data: () => ({
    sectionIndex: undefined,
    sections: [
      {
        icon: "individual.svg",
        alt: "Person Icon",
        name: "Individual",
      },
      {
        icon: "social.svg",
        alt: "Staff Icon",
        name: "Societal",
      },
      {
        icon: "community.svg",
        alt: "Institutional Icon",
        name: "Institutional",
      },
    ],
  }),
  methods: {
    setSection(index) {
      this.sectionIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  padding: 0;
}

.stigma-level {
  cursor: pointer;
  opacity: 0.25;
  // padding: 1em;
  border-radius: 1em;
  transition: opacity 200ms;
  list-style: none;
  text-align: center;

  @include breakpoint(phablet) {
    &.column {
      padding-bottom: 2em !important;
    }
  }

  &:hover {
    opacity: 0.5;
  }

  &.active {
    // background-color: rgba($colour-dark, 0.5);
    opacity: 1;
  }

  .name {
    font-size: 0.75em;
    @include breakpoint(phone) {
      font-size: 1em;
    }
  }

  img {
    height: 2em;
    margin: 0 auto;

    @include breakpoint(phone) {
      height: 3em;
    }
  }
}
</style>