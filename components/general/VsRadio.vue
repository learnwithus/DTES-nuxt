<template>
  <label class="vs-radio">
    <input type="radio" :name="name" :checked="modelValue === val" :disabled="disabled" @change="$emit('update:modelValue', val)" />
    <span><slot /></span>
  </label>
</template>

<script setup>
defineProps({ modelValue: Number, val: Number, name: String, disabled: Boolean })
defineEmits(['update:modelValue'])
</script>

<style>
.vs-radio { display: flex; align-items: center; gap: 6px; cursor: pointer; }
.vs-radio input {
  appearance: none;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  margin: 0;
  border: 2px solid rgba(44, 62, 80, .25);
  border-radius: 50%;
  background: white;
  cursor: pointer;
}

.vs-radio input:checked {
  border: 7px solid #3b83c2;
  box-shadow: 0 3px 12px rgba(59, 131, 194, .3);
}

.vs-radio input:disabled { cursor: default; }
</style>
