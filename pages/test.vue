<template>
  <div>
    <hotspot-image src="images/placeholder.png" :hotspots="hotspots" />
  </div>
</template>

<script>
export default {
  data: () => ({
    hotspots: [
      {
        x: "20%",
        y: "20%",
        text: "This is one hotspot, it's super cool"
      },
      {
        x: "40%",
        y: "10%",
        text: "This is another hotspot, it's also very cool"
      },
    ],
  }),
};
</script>

<style>
</style>