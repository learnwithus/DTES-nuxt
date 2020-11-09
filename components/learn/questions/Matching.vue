<template>
  <div>
    <div class="columns is-hidden-mobile">
      <div class="column is-3 title">
        {{ termColumnTitle }}
      </div>
      <div class="column is-5 title">
        {{ definitionColumnTitle }}
      </div>
      <div class="column is-4"></div>
    </div>
    <div v-for="(term, index) in termContent" v-bind:key="index">
      <div class="columns">
        <!-- Terms -->
        <div class="column is-3">
          {{ term[0] }}
        </div>
        <!-- User Chosen Defintitions that match with term -->
        <div
          class="user-definition column is-5"
          :class="{ 'reveal-answer': revealAnswer }"
        >
          <!-- Drag / Drop UI for desktop -->
          <drop
            class="drop is-hidden-mobile"
            :class="{ incorrect: !isCorrectDefinition(index) }"
            @drop="(definition, event) => handleDrop(definition, event, index)"
            :data-id="index"
            >{{ userAnswers[index] }}</drop
          >
          <!-- Dropdown Select for mobile -->
          <vs-select
            placeholder="Select"
            v-model="userAnswers[index]"
            class="is-hidden-tablet"
            :state="
              revealAnswer
                ? isCorrectDefinition(index)
                  ? 'success'
                  : 'danger'
                : ''
            "
          >
            <vs-option
              v-for="(definition, index) in termDefinitions"
              :key="index"
              :label="definition"
              :value="definition"
              >{{ definition }}</vs-option
            >
          </vs-select>
        </div>
        <!-- Answers -->
        <div class="column is-4">
          <div class="answer" :class="{ hide: !revealAnswer }">
            {{
              isCorrectDefinition(index) ? "Correct!" : termDefinitions[index]
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="is-hidden-mobile drag-options" :class="{ hide: revealAnswer }">
      <!-- Available definitions to match with terms -->
      <div v-for="(definition, index) in termDefinitions" v-bind:key="index">
        <drag
          class="drag"
          :transfer-data="definition"
          :draggable="!revealAnswer"
          >{{ definition }}</drag
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";
export default {
  components: {
    Drag,
    Drop,
  },
  props: ["answers", "revealAnswer"],
  data() {
    return {
      selectedAnswer: 0,
      userAnswers: new Array(this.$props.answers.length).fill(""),
    };
  },
  mounted() {
    console.log(this.userAnswers);
  },
  computed: {
    termColumns() {
      const firstTerm = this.$props.answers[0];
      return Object.keys(firstTerm);
    },
    termContent() {
      return this.$props.answers.map((term) => {
        return Object.values(term);
      });
    },
    termDefinitions() {
      return this.termContent.map((term) => {
        return term[1];
      });
    },
    termColumnTitle() {
      return this.termColumns[0];
    },
    definitionColumnTitle() {
      return this.termColumns[1];
    },
  },
  methods: {
    handleDrop(definition, event, index) {
      this.$set(this.userAnswers, index, definition);
    },
    isCorrectDefinition(index) {
      const definition = this.userAnswers[index];
      return this.termDefinitions[index] === definition;
    },
  },
};
</script>

<style lang="scss" scoped>
.drag-options {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  color: $colour-primary;
  margin: 2em -0.25em 0 -0.25em;
  transition: opacity 200ms linear;
  > * {
    max-width: 20em;
    margin-bottom: 0.5em;
    flex-grow: 1;
  }

  &.hide {
    opacity: 0;
  }
}
.drop {
  border: 1.5px $colour-primary dashed;
  color: $colour-primary;
  border-radius: 0.5em;
  min-height: 2em;
  padding: 0.5em 0.75em;
  font-size: 0.9em;

  .reveal-answer & {
    border-color: $colour-accent;
    color: $colour-accent;
    border-style: solid;
    &.incorrect {
      opacity: 0.2;
    }
  }
}
.drag {
  font-size: 0.9em;
  border: 1px solid $colour-primary;
  box-sizing: border-box;
  border-radius: 0.5em;
  padding: 0.5em;
  margin: 0.25em;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}
.title {
  font-weight: bold;
}
.answer {
  color: $colour-accent;
  transition: opacity 200ms linear;
  &.hide {
    opacity: 0;
  }
}
</style>