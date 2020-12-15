<template>
  <markdown-container>
    <div class="column is-one-fifth">
      <ul class="columns is-mobile is-multiline is-gapless is-centered">
        <li
          v-for="(section, index) in sections"
          v-bind:key="index"
          class="timeline-item column is-4-mobile is-full-tablet"
          @mousedown="setSection(index)"
          :class="{ active: sectionIndex == index }"
        >
          <div class="name">{{ section.name }}</div>
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
              Practising with a person-based and evidence-based, not
              punitive-based, care model
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
        </div>
        <div v-else-if="sectionIndex == 3" key="3">
          <p>4</p>
        </div>
        <div v-else key="4">
          <p>Timeline</p>
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
        icon: "1.jpg",
        name: "1",
      },
      {
        icon: "2.jpg",
        name: "2",
      },
      {
        icon: "3.jpg",
        name: "3",
      },
      {
        icon: "4.jpg",
        name: "4",
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
  display: flex;
  flex-direction: column;
}

.timeline-item {
  cursor: pointer;
  border-radius: 50%;
  transition: opacity 200ms;
  list-style: none;
  text-align: center;
  border: 0.5em #8792a8 solid;
  height: 4em;
  width: 4em;

  &:not(:last-child):after {
    content: "";
    width: 1em;
    height: 2.75em;
    background-color: #8792a8;
    position: absolute;
    z-index: -1;
    transform: translateY(0) translateX(-0.5em);
    transition: all 0.25s ease-out;
  }

  @include breakpoint(phablet) {
    &.column {
      margin-bottom: 2em !important;
    }
  }

  &:hover {
    border-color: #afb6c5;
  }

  &.active {
    // background-color: rgba($colour-dark, 0.5);
    border-color: white;
  }

  .name {
    font-size: 1em;
    font-weight: 700;
    text-align: center;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    @include breakpoint(phone) {
      font-size: 1.5em;
    }
  }

  // img {
  //   height: 2em;
  //   margin: 0 auto;
  //   border-radius: 50%;

  //   @include breakpoint(phone) {
  //     height: 5em;
  //   }
  // }
}
</style>