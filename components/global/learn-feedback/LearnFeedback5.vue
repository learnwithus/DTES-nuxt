<template>
  <markdown-container>
    <markdown-column size="2" style="padding-right: 3em">
      <ul>
        <li
          v-for="(section, index) in sections"
          v-bind:key="index"
          class="stigma-level"
          @mousedown="setSection(index)"
          :class="{ active: sectionIndex == index }"
        >
          <img :src="require(`~/assets/images/icons/${section.icon}`)" alt="" />
          <p class="name">{{ section.name }}</p>
        </li>
      </ul>
    </markdown-column>

    <markdown-column size="10" style="padding-left: 3em">
      <transition name="verticle-slide-fade" mode="out-in">
        <div v-if="sectionIndex == 0" key="0">
          <h3>Individual</h3>
          <ul>
            <li>Self-reflection and further education</li>
            <li>Trauma-informed Practice  * Hyperlink 1</li>
            <li>Language matters *Hyperlink 2</li>
            <li>Practising with a person-based and evidence-based, not punitive-based, care model</li>
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
            <li>Direct involvement of people with lived experience in institutional decision making, and compensation for their involvement* *http://www.bccdc.ca/resource-gallery/Documents/PEEP%20Best%20Practice%20Guidelines.pdf </li>
            <li>Ongoing targeted training and education </li>
            <li>Ongoing assessment of policy and practices</li>
            <li>Inclusion of de-stigmatizing programs and services</li>
            <li>Providing outlets for feedback</li>
          </ul>
        </div>
        <div v-else key="3">
          <p>
            Examples of ways to address stigma on each level
          </p>
          <em>Click on the icons on the left to learn more.</em>
        </div>
      </transition>
    </markdown-column>
  </markdown-container>
</template>

<script>
export default {
  data: () => ({
    sectionIndex: undefined,
    sections: [
      {
        icon: "individual.svg",
        name: "Individual"
      },
      {
        icon: "staff.svg",
        name: "Societal"
      },
      {
        icon: "community.svg",
        name: "Institutional"
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
.stigma-level {
  cursor: pointer;
  opacity: 0.25;
  padding: 1em;
  border-radius: 1em;
  transition: opacity 200ms;
  list-style: none;
  text-align: center;

  &:hover {
    opacity: 0.5;
  }

  &.active {
    // background-color: rgba($colour-dark, 0.5);
    opacity: 1;
  }

  img {
    height: 3em;
  }
}
</style>