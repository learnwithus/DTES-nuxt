export const state = () => ({
  header: {
    overlay: false,
    visible: true,
    transparent: false,
    logo: true,
  },
  background: {
    image: {
      current: null,
      next: null,
    },
    dark: {
      current: false,
      next: false,
    },
  },
  tour: {
    videos: {
      dtes: [],
      coastal: [],
    },
    started: false,
    videoRequirement: 4 // How many videos is the user required to watch
  },
  userProgress: {
    videos: [],
    tour: false,
  },
});

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { $content }) {
    const dtes = await $content("tour/dtes/videos").fetch();
    const coastal = await $content("tour/coastal/videos").fetch();

    await commit("setVideos", { 
      dtes: dtes.map(x => ({...x, region: 'dtes'})), 
      coastal: coastal.map(x => ({...x, region: 'coastal'})), 
    });
  },
};

export const mutations = {
  setVideos(state, { dtes, coastal }) {
    state.tour.videos.dtes = dtes;
    state.tour.videos.coastal = coastal;
  },
  overlayHeader(state) {
    state.header.overlay = true;
  },
  fixedHeader(state) {
    state.header.overlay = false;
  },
  showHeader(state) {
    state.header.visible = true;
  },
  hideHeader(state) {
    state.header.visible = false;
  },
  setBackgroundImage(state, value) {
    // console.log("setting background to: " + value);
    if (value !== state.background.image.next) {
      state.background.image.next = value;

      // If we're running on the server, set the actual background image as well
      // because this must be the first pageload
      if (process.server) {
        state.background.image.current = state.background.image.next;
      }
    }
  },
  // Sets background image to the the new background image (Done in router plugin '~/plugins/backgroundImage.js')
  updateBackgroundImage(state) {
    state.background.image.current = state.background.image.next;
  },
  clearBackgroundImage(state) {
    state.background.image.current = null;
  },
  clearDarkBackgroundRequest(state) {
    state.background.dark.next = false;
  },
  transparentHeader(state) {
    state.header.transparent = true;
  },
  defaultHeader(state) {
    state.header.transparent = false;
    state.header.logo = true;
  },
  hideHeaderLogo(state) {
    state.header.logo = false;
  },
  requestDarkBackground(state) {
    state.background.dark.next = true;

    // If we're running on the server, set the actual dark mode as well
    // because this must be the first pageload
    if (process.server) {
      state.background.dark.current = state.background.dark.next;
    }
  },
  // updateDarkBackground(state){
  //     state.background.dark.current = state.background.dark.next;
  // },
  setDarkBackground(state, value) {
    // console.log("setting actual background dark state to: " + value);
    state.background.dark.current = value ? true : false;
  },
  beginTour(state) {
    state.tour.started = true;
  },
  userWatchedVideo(state, video) {
    if (!state.userProgress.videos.find((x) => x === video)) {
      state.userProgress.videos.push(video);
    }
  },
  resetUserProgress(state) {
    state.userProgress = {
      videos: [],
      tour: false,
    }
  }
};

export const getters = {
  getBackgroundImage: (state) => {
    return state.background.image.current;
  },
  getBackgroundDark: (state) => {
    return state.background.dark.current;
  },
  videos: (state) => {
    return[...state.tour.videos.dtes, ...state.tour.videos.coastal];
  },
  dtesVideos: (state) => state.tour.videos.dtes,
  coastalVideos: (state) => state.tour.videos.coastal,
  peers: (state, getters) => {
    return getters.videos.filter((video) => video.type == "peer");
  },
  services: (state, getters) => {
    return getters.videos.filter((video) => video.type == "service");
  },
  getVideoBySlug: (state, getters) => (slug) => {
    return getters.videos.find((video) => video.slug === slug);
  },
  userProgress: (state) => {
    return state.userProgress;
  },
  tourVideoRequirement: (state) => {
    return state.tour.videoRequirement;
  },
  tourComplete: (state) => {
    return state.userProgress.videos.length >= state.tour.videoRequirement;
  }
};
