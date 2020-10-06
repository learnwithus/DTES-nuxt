<template>
  <markdown-container>
    <markdown-column size="1" style="padding-right: 3em">
      <transition name="verticle-slide-fade" mode="out-in">
        <div v-if="sectionIndex == 0" key="0">
          <h3>
            20% of people overdosed after leaving Emergency Departments either
            against medical advice
          </h3>
          <p>
            Indicates there is a missed opportunity to engage these individuals
            in care.
          </p>
          <p>
            Potential strategies to engage this group could include harm
            reduction initiatives and services at point of care, which in turn
            would challenge stigma from healthcare workers.
          </p>
        </div>
        <div v-else-if="sectionIndex == 1" key="1">
          <h3>
            16% of people overdosed and had no engagement with medical care
          </h3>
          <p>
            Highlights a need for community-based / non-clinical strategies to
            engage, focussing on reducing barriers to care
          </p>
        </div>
        <div v-else-if="sectionIndex == 2" key="2">
          <h3>
            60% of individuals treated for illicit drug overdose in a hospital
            setting did not have a mental health or substance use disorder
            diagnosis in the year leading up to the overdose
          </h3>
          <ul>
            <li>
              Not all overdoses are characterised by use or mental health
              diagnoses. This highlights the need for integration of harm
              reduction and overdose education in routine daily care.
            </li>
            <li>
              Stigma may result in under-diagnosis and reduced preventative
              treatment
            </li>
          </ul>
        </div>
        <div v-else key="3">
          <p>
            Study: BC healthcare utilization patterns by people who experience
            an overdose from illegal drugs
          </p>
          <em>Click on the diagram on the right to learn more.</em>
        </div>
      </transition>
    </markdown-column>

    <markdown-column size="1" style="padding-left: 3em">
      <ul>
        <li
          v-for="(section, index) in sections"
          v-bind:key="index"
          class="utilization-section"
          @mousedown="setSection(index)"
          :class="{ active: sectionIndex == index }"
        >
          <div class="percentage">{{ section.perecentage }}%</div>
          <div class="right-section">
            <img
              :src="require(`~/assets/images/icons/${section.icon}`)"
              alt=""
            />
            <p class="description">{{ section.description }}</p>
          </div>
        </li>
      </ul>
    </markdown-column>
  </markdown-container>
</template>

<script>
export default {
  data: () => ({
    sectionIndex: undefined,
    sections: [
      {
        perecentage: 20,
        icon: "ambulance.svg",
        description:
          "of people overdosed after leaving Emergency Departments either against medical advice",
      },
      {
        perecentage: 16,
        icon: "hospital.svg",
        description:
          "of people overdosed and had no engagement with medical care",
      },
      {
        perecentage: 60,
        icon: "clipboard.svg",
        description:
          "of individuals treated for illicit drug overdose in a hospital setting did not have a mental health or substance use disorder diagnosis in the year leading up to the overdose",
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
.utilization-section {
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  // margin-bottom: 2em;
  opacity: 0.25;
  padding: 1em;
  border-radius: 1em;
  transition: opacity 200ms;

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
.right-section {
  flex-grow: 1;
}
.percentage {
  font-size: 2em;
  padding-right: 2em;
  font-family: $font-serif;
  font-weight: 200;
  letter-spacing: 0.05em;
  // max-width: 10em;
  // width: 10em;
}
</style>