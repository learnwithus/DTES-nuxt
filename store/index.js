export const state = () => ({
  header: {
    overlay: false,
    visible: true,
    transparent: false,
    logo: true,
  },
  background: {
    image: null,
    dark: false,
  },
  tour: {
    videos: {
      dtes: [],
      coastal: [],
    },
    started: false,
    videoRequirement: 8 // How many videos is the user required to watch
  },
  userProgress: {
    videos: [],
    tour: false,
  },
});

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
    state.background.image = value;
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
  setDarkBackground(state, value) {
    state.background.dark = value;
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
    return state.background.image;
  },
  getBackgroundDark: (state) => {
    return state.background.dark;
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
