<template>
  <VDropdown
    v-model:shown="open"
    class="course-select"
    popper-class="course-select-popup"
    placement="bottom-start"
    :triggers="['click']"
    :distance="0"
    :arrow-overflow="false"
    :disabled="disabled"
    :auto-size="true"
  >
    <button
      ref="trigger"
      type="button"
      class="course-select-trigger"
      :class="[state, { placeholder: !modelValue, open }]"
      :aria-label="label + ': ' + (modelValue || 'Select')"
      :aria-expanded="open"
      :aria-controls="open ? optionsId : undefined"
      :disabled="disabled"
      @keydown.esc="close"
    >
      <span>{{ modelValue || 'Select' }}</span>
      <i aria-hidden="true"></i>
    </button>
    <template #popper>
      <div :id="optionsId" :aria-label="label" role="group" @keydown.esc="close">
        <button
          v-for="option in options"
          :key="option"
          type="button"
          class="course-select-option"
          :class="{ selected: option === modelValue }"
          @click="choose(option)"
        >
          {{ option }}
        </button>
      </div>
    </template>
  </VDropdown>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  options: { type: Array, required: true },
  label: { type: String, required: true },
  disabled: Boolean,
  state: String
})
const emit = defineEmits(['update:modelValue'])
const open = ref(false)
const trigger = ref(null)
const optionsId = useId()

function close() {
  open.value = false
  trigger.value?.focus()
}

function choose(option) {
  emit('update:modelValue', option)
  close()
}
</script>

<style>
.course-select {
  width: 100%;
  max-width: 200px;
}

.course-select-trigger {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 38px;
  padding: 7px 30px 7px 13px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: #f4f7f8;
  color: #2c3e50;
  font: 13.333px Arial;
  cursor: pointer;
  text-align: left;
}

.course-select-trigger span {
  overflow: hidden;
  white-space: nowrap;
}

.course-select-trigger.placeholder span { opacity: .4; }
.course-select-trigger.open {
  background: white;
  border-radius: 12px 12px 0 0;
}

.course-select-trigger i {
  position: absolute;
  right: 14px;
  width: 7px;
  height: 7px;
  border: solid currentColor;
  border-width: 0 1px 1px 0;
  transform: translateY(-2px) rotate(45deg);
}

.course-select-trigger.open i { transform: translateY(2px) rotate(225deg); }
.course-select-trigger:disabled { cursor: default; opacity: .5; }
.course-select-trigger.success { color: #17c964; background: #f3fcf7; }
.course-select-trigger.danger { color: #f2135d; background: #fef3f7; }

.course-select-popup .v-popper__arrow-container { display: none; }
.course-select-popup .v-popper__inner {
  box-sizing: border-box;
  width: 200px;
  max-height: 210px;
  padding: 5px;
  overflow: auto;
  border: 0;
  border-radius: 0 0 12px 12px;
  background: white;
  color: #2c3e50;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .06);
}

.course-select-option {
  display: block;
  width: 100%;
  margin: 2px 0;
  padding: 6px 10px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font: 13.333px Arial;
  text-align: left;
  cursor: pointer;
}

.course-select-option:hover, .course-select-option:focus-visible, .course-select-option.selected {
  background: #f4f7f8;
  color: #3b83c2;
}
</style>
