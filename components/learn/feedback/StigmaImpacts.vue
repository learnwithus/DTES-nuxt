<template>
  <markdown-container class="is-reversed-mobile">
    <div class="column">
      <div v-if="activeContent == 'individual'">
        <h3>Individual Stigma</h3>
        <ul>
          <li>
            Interpersonal stigma is expressed as discrimination - as defined as
            unfair treatment due to a person’s identity
            <a
              href="https://ontario.cmha.ca/documents/stigma-and-discrimination/"
              target="_blank"
              >(source)</a
            >
          </li>
          <li>
            <strong>Interpersonal</strong> (eg, self-stigma): People who use
            Substances (PWUS) might internalize stigma.
            <ul>
              <li>
                This could manifest in a reduced sense of self-worth, increased
                likelihood to conceal use of drugs, or reduced help or support
                seeking. All this leads to increased harms.
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div v-else-if="activeContent == 'community'">
        <h3>Social stigma</h3>
        <ul>
          <li>
            At a societal level, negative labels and images, rhetoric and
            stereotyping by members of the public, news, media, public figures,
            etc. reinforces and informs public perspective of the situation and
            the crisis, and ultimately impact political leanings and policies.
          </li>
        </ul>
      </div>
      <div v-else-if="activeContent == 'staff'">
        <h3>Structural stigma</h3>
        <ul>
          <li>Stigma within structures or institutions.</li>
          <li>
            For example, laws and policies about substances and substance use,
            “zero tolerance” policies at health and social services, and the
            criminalization of substance use.
          </li>
        </ul>
      </div>
      <div v-else>
        <p>The negative impacts of stigma can be felt on many levels.</p>
        <em
          >Click on the diagram on the right for examples of these impacts.</em
        >
      </div>
    </div>

    <markdown-column>
      <!-- Venn Diagram -->
      <svg
        width="100%"
        viewBox=" 0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <title>Circles</title>
          <ellipse
            ry="150"
            rx="150"
            :class="{ active: isActive('community') }"
            class="venn-cirlcle"
            cy="368.98567"
            cx="303.88194"
            @click="setActiveContent('community')"
          />
          <ellipse
            ry="150"
            rx="150"
            :class="{ active: isActive('staff') }"
            class="venn-cirlcle"
            cy="368.98567"
            cx="511.88435"
            @click="setActiveContent('staff')"
          />
          <ellipse
            ry="150"
            rx="150"
            :class="{ active: isActive('individual') }"
            class="venn-cirlcle"
            cy="184"
            cx="400"
            @click="setActiveContent('individual')"
          />
        </g>
        <g>
          <title>Icons</title>
          <image
            x="370"
            y="80"
            class="venn-icon"
            :class="{ active: isActive('individual') }"
            :width="iconSize"
            :height="iconSize"
            xlink:href="~/assets/images/icons/individual.svg"
          />
          <image
            x="490"
            y="340"
            class="venn-icon"
            :class="{ active: isActive('staff') }"
            :width="iconSize"
            :height="iconSize"
            xlink:href="~/assets/images/icons/community.svg"
          />
          <image
            x="250"
            y="340"
            class="venn-icon"
            :class="{ active: isActive('community') }"
            :width="iconSize"
            :height="iconSize"
            xlink:href="~/assets/images/icons/social.svg"
          />
        </g>
        <g>
          <title>Text</title>
          <text
            y="200"
            x="367"
            :class="{ active: isActive('individual') }"
            class="venn-title"
          >
            Individual
          </text>
          <text
            y="460"
            x="260"
            :class="{ active: isActive('community') }"
            class="venn-title"
          >
            Social
          </text>
          <text
            y="460"
            x="490"
            :class="{ active: isActive('staff') }"
            class="venn-title"
          >
            Structural
          </text>
        </g>
      </svg>
    </markdown-column>
  </markdown-container>
</template>

<script>
export default {
  data: () => ({
    iconSize: 70,
    activeContent: false,
  }),
  methods: {
    setActiveContent(key) {
      this.activeContent = key;
      // console.log(this.contentToDisply);
    },
    isActive(key) {
      return this.activeContent == key;
    },
  },
};
</script>

<style scoped lang="scss">
.venn-cirlcle {
  stroke-width: 2px;
  stroke: white;
  fill: none;
  pointer-events: all;
  cursor: pointer;

  &:hover {
    fill: rgba(255, 255, 255, 0.25);
  }

  &.active {
    fill: rgba(255, 255, 255, 0.75);
    // color: $colour-primary;
  }
}

.venn-title {
  fill: white;
  pointer-events: none;

  &.active {
    fill: $text-colour-dark;
  }
}

.venn-icon {
  pointer-events: none;
  &.active {
    filter: brightness(20%);
  }
}
</style>