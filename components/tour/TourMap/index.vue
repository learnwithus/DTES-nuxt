<template>
  <div class="tour-map">
    <div class="mini-map-container" @click="showMap = true" >
      <dtes-map class="mini-map" :class="{active: showMap}"/>
    </div>

    <div class="map-overlay-container" v-if="showMap">
      <button class="map-close-button" @click="showMap = false">x</button>
      <div class="map-wrapper">
        <dtes-map />
      </div>
    </div>
  </div>
</template>

<script>
import DtesMap from "./-map";
export default {
  components: {
    DtesMap,
  },
  data() {
    return {
      showMap: false,
    };
  },
};
</script>

<style lang="scss">
.tour-map {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2em;
}

.mini-map {
  max-width: 20em;
  transition: all 200ms linear;

  &.active {
    transform: scale(2);
    opacity: 0;
  }
}

.map-close-button {
  align-self: flex-end;
  margin-top: 7rem;
  width: 5em;
  padding: 0.5em;
  font-size: 1.25em;
  background-color: black;
  color: white;
  border: none;
}

.mini-map-container {
  cursor: pointer;
}

.map-overlay-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.356);
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;

  .map-wrapper {
    flex-grow: 1;
    padding: 10em;
  }

  .map {
    width: 100%;
  }
}
</style>