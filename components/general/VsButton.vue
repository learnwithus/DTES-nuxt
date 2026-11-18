<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :type="!to && !href ? 'button' : undefined"
    :target="blank ? '_blank' : undefined"
    :rel="blank ? 'noopener noreferrer' : undefined"
    class="vs-button"
    :class="[size, { bordered: border, active, dark }]"
    :style="{ '--button-color': color || (dark ? '#202020' : '#3b83c2') }"
  >
    <span class="vs-button__content"><slot /></span>
  </component>
</template>

<script setup>
import { NuxtLink } from '#components'
defineProps({ to: [String, Object], href: String, blank: Boolean, flat: Boolean, border: Boolean, active: Boolean, dark: Boolean, color: String, size: String })
</script>

<style lang="scss">
.vs-button {
  position: relative;
  z-index: 1;
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  margin: 5px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--button-color);
  cursor: pointer;
  font: 0.8rem Arial;
  text-decoration: none;

  .vs-button__content { padding: 8px 12px; }
  &.bordered { box-shadow: inset 0 0 0 2px var(--button-color); }
  &.large {
    border-radius: 15px;
    font-size: 1rem;
    .vs-button__content { padding: 10px 15px; }
  }
  &.xl {
    border-radius: 20px;
    .vs-button__content { padding: 15px 20px; font-size: 1.1rem; }
  }
  &.active, &.bordered:hover, &.bordered:focus-visible {
    color: white;
    background: var(--button-color);
  }
  &[style*="#fff"]:hover { color: #202020; }
}
a.vs-button, .dark a.vs-button {
  color: var(--button-color);
  border: 0;
}
</style>
