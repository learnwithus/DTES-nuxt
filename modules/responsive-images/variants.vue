<template>
  <!-- Build-time only: see index.js. Every image the site can request is rendered here once. -->
  <div hidden>
    <template v-for="{ path, preset } in variants" :key="`${preset}:${path}`">
      <img v-if="preset === 'poster' || preset === 'tooltip'" :src="singleImage($img, path, preset)" alt="" />
      <img v-else v-bind="responsiveImage($img, path, preset)" alt="" />
    </template>
  </div>
</template>

<script setup>
import { useHead, useImage, useNuxtApp } from "#imports";
import documents from "#build/course-data.mjs";
import { responsiveImage, singleImage } from "~/utils/responsive-image";

useHead({ meta: [{ name: "robots", content: "noindex, nofollow" }] });

const $img = useImage();
const { $store } = useNuxtApp();
const videos = $store.getters.videos;
const tour = (path) => path && `tour/${path}`;

// Images placed in course content with <markdown-image> or <hotspot-image>
const contentImages = [...JSON.stringify(documents).matchAll(/"src":"(images\/[^"]+\.(?:jpe?g|png|webp))"/gi)].map((match) => match[1]);

const variants = [
  { path: "images/logo-large.png", preset: "logo" },
  { path: "images/tourintrobg-large.jpg", preset: "background" },
  ...videos.flatMap((video) => [
    { path: tour(video.background), preset: "background" },
    { path: tour(video.profile), preset: "profile" },
    { path: tour(video.profile), preset: "tooltip" },
    { path: tour(video.poster), preset: "poster" },
  ]),
  ...["tour/intro", "tour/conclusion"].map((name) => ({ path: tour(documents[name]?.poster), preset: "poster" })),
  ...contentImages.map((path) => ({ path, preset: "content" })),
].filter(({ path }) => path && !/^tour\/https?:/.test(path));
</script>
