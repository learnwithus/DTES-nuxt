<template>
  <picture><img :src="src" :alt="alt" /></picture>
</template>

<script setup>
defineProps({ src: String, alt: String })
</script>
