<template>
  <div class="tour-map">
    <div class="mini-map-container" @click="showMap = true">
      <div v-if="$props.location" class="mini-map-location">
        {{ video.location }}
      </div>
      <dtes-map
        v-if="region === 'dtes'"
        :interactive="false"
        :location="$props.location"
        :simple="true"
        class="mini-map"
      />
      <coastal-map
        v-if="region === 'coastal'"
        :interactive="false"
        :location="$props.location"
        :simple="true"
        class="mini-map"
      />
    </div>

    <transition name="fade">
      <div
        class="map-overlay-container"
        v-if="showMap"
        :class="{ active: showMap }"
        @click.self="showMap = false"
      >
        <button class="map-close-button" @click="showMap = false">x</button>
        <div class="map-wrapper container">
          <dtes-map
            v-if="region === 'dtes'"
            :interactive="true"
            :location="$props.location"
            @click-container="showMap = false"
          />
          <coastal-map
            v-else-if="region === 'coastal'"
            :interactive="true"
            :location="$props.location"
            @click-container="showMap = false"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DtesMap from "./TourMap/DTES";
import CoastalMap from "./TourMap/Coastal";
export default {
  components: {
    DtesMap,
    CoastalMap,
  },
  props: {
    location: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showMap: false,
    };
  },
  computed: {
    ...mapGetters(["videos"]),
    video() {
      return this.videos.find((x) => x.slug == this.$props.location);
    },
  },
};
</script>

<style lang="scss">
.tour-map {
  // background-color: rgba(0, 0, 0, 0.5);
  // padding: 2em;
}

.mini-map {
  max-width: 20em;
  transition: all 200ms linear;

  &.active {
    // transform: scale(2);
    opacity: 0;
  }
}

.map-close-button {
  align-self: flex-end;
  margin-top: 70px;
  width: 5em;
  padding: 0.5em;
  font-size: 1.25em;
  background-color: black;
  color: white;
  border: none;
}

.mini-map-container {
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  border-radius: 1em;
  padding: 1em;
  cursor: pointer;
  display: inline-block;

  @supports (backdrop-filter: blur(8px)) {
    backdrop-filter: blur(8px);
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.mini-map-location {
  margin-bottom: 1em;
}

.map-overlay-container {
  z-index: 2;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;

  .map-wrapper {
    flex-grow: 1;
    box-sizing: border-box;
    margin-top: 4em;
    width: 100%;
    height: 100%;
    display: flex;

    > * {
      flex-grow: 1;
    }
  }

  // .map {
  //   width: 100%;
  // }
}
</style>