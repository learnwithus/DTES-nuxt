<template>
  <markdown-container class="learn--timeline">
    <div class="column is-one-fifth">
      <ul class="timeline">
        <li
          v-for="(section, index) in sections"
          v-bind:key="index"
          class="timeline-item"
          @mousedown="setSection(index)"
          :class="{ active: sectionIndex == index }"
        >
          <div class="icon-wrapper" v-html="require(`~/assets/images/icons/${section.icon}?raw`)" />
          <!-- <div class="name">{{ section.name }}</div> -->
        </li>
      </ul>
    </div>

    <div class="column">
      <transition name="verticle-slide-fade" mode="out-in">
        <div v-if="sectionIndex == 0" key="0">
          <h3>
            1. When a health problem or substance use issue needs medical
            attention
          </h3>

          <p>
            <strong>Issue:</strong> Previous negative experiences, expectations
            of poor treatment or internalized stigma can discourage people from
            seeking help.
          </p>

          <p>
            <strong>Outcome:</strong> Clients may delay or avoid seeking help.
            <br />- Conditions may worsen and become more complex if care is
            delayed <br />- Increased morbidity and mortality due to illness or
            overdose
          </p>
          <p>“If I go to hospital, they won’t believe me or listen to me.”</p>
          <p>“It’s my own fault I am sick, I don’t deserve help.”</p>
        </div>

        <div v-else-if="sectionIndex == 1" key="1">
          <h3>
            2. When people first come into a service (person at reception desk)
          </h3>

          <p>
            <strong>Issue:</strong> Negative first impression through signs and
            interactions at reception will colour clients’ entire experience of
            service
          </p>

          <p>
            <strong>Outcome:</strong> : Clients may leave without getting seen
            or having problems addressed<br />- Clients will enter clinical
            encounter feeling unsafe/ judged.
          </p>
          <p>“I’m not welcome here, I should just get out of here.”</p>
          <p>
            “I can tell by the way you’re looking at me that you won’t help me.”
          </p>
          <p>
            “They are making me wait because they don’t like people like me.”
          </p>
        </div>
        <div v-else-if="sectionIndex == 2" key="2">
          <h3>3. Clinical assessment (clinic room or triage desk)</h3>

          <p>
            <strong>Issue:</strong> Clients may not disclose important
            information for fear of being treated differently <br />- Providers
            can jump to conclusions about symptoms/ diagnosis/ care plans
          </p>

          <p>
            <strong>Outcome:</strong> Abuse, conflict and violence can escalate
            Misdiagnosis <br />- Minimizing of symptoms and distress
          </p>
          <p>
            <strong>Client:</strong> “If I’m open about my substance use, I’ll
            get treated worse than everyone else.”
          </p>
          <p>
            <strong>Provider:</strong> “This person is just drunk/ high, I don’t
            have to look further for the cause of their symptoms.”
          </p>
        </div>
        <div v-else-if="sectionIndex == 3" key="3">
          <h3>4. Care plans, referral and follow up</h3>

          <p>
            <strong>Issue:</strong> Assumptions, misunderstandings and poor
            communication between clients and providers
          </p>

          <p>
            <strong>Outcome:</strong> Clients are labelled as drug seeking
            receive inadequate pain control <br />- care plans may not reflect
            clients’ situations <br />- Providers may hesitate to refer to
            specialists<br />- Clients may miss follow up appointments and be
            lost to care<br />- Clients may not feel comfortable following up,
            avoid care in future<br />- People die of overdose or illness
            because they did not receive health care
          </p>
          <p>
            “I’m not getting better, but there’s no way I’ll go back there.”
          </p>
        </div>
        <div v-else key="4">
          <h3>The Stigma Timeline</h3>
          <em
            >Click on the icons on the left to explore how stigma affects the
            healthcare experience.</em
          >
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
        icon: "community.svg",
        name: "1",
      },
      {
        icon: "secretary.svg",
        name: "2",
      },
      {
        icon: "doctor.svg",
        name: "3",
      },
      {
        icon: "checklist.svg",
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

<style lang="scss">
.learn--timeline {
  .timeline {
    padding: 0;
    display: flex;
    justify-content: space-between;
    @include breakpoint(phablet) {
      display: block;
    }
  }

  .timeline-item {
    cursor: pointer;
    border-radius: 50%;
    transition: opacity 200ms;
    list-style: none;
    text-align: center;
    border: 0.25em #8792a8 solid;
    height: 3em;
    width: 3em;
    // padding: 1em;

    @include breakpoint(phone) {
      border-width: 0.5em;
      font-size: 1em;
      height: 3.5em;
      width: 3.5em;
    }

    @include breakpoint(phablet) {
      margin-bottom: 2em !important;
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
    }

    &:hover {
      border-color: #afb6c5;
    }

    &.active {
      // background-color: rgba($colour-dark, 0.5);
      border-color: white;

      path {
        fill: white;
      }
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

    .icon-wrapper {
      height: 100%;
    }

    svg {
      width: 50%;
      height: 100%;
      // margin: 0 auto;
      path {
        fill: #afb6c5;
      }
    }
  }
}
</style>