<template>
  <picture><img ref="img" v-bind="attrs" :alt="alt" @load="emit('load')" @error="emit('load')" /></picture>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { responsiveImage } from "~/utils/responsive-image";

const props = defineProps({ src: String, alt: String, preset: String, sizes: String });
// "load" fires once the image has settled (loaded, cached or failed), so callers can reveal it
const emit = defineEmits(["load"]);

const $img = useImage();
const attrs = computed(() => responsiveImage($img, props.src, props.preset, props.sizes));

// A cached image can finish loading before hydration, when no load event reaches Vue
const img = ref(null);
onMounted(() => {
  if (img.value?.complete) emit("load");
});
</script>
