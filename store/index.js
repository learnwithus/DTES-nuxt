export const state = () => ({
    header: {
        overlay: false,
        visible: true
    },
    backgroundImage: null,
    newBackgroundImage: null,
    tour: {
        started: false
    }
})

export const mutations = {
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
        console.log("setting background to: " + value)
        if (value !== state.newBackgroundImage) {
            state.newBackgroundImage = value;

            if (process.server) {
                console.log("we're running on the server!!!")
                state.backgroundImage = state.newBackgroundImage;
            }
        }
    },
    // Sets background image to the the new background image (Done in router plugin '~/plugins/backgroundImage.js')
    updateBackgroundImage(state) {
        state.backgroundImage = state.newBackgroundImage;
    },
    clearBackgroundImage(state) {
        state.backgroundImage = null;
    },
    beginTour(state){
        state.tour.started = true;
    }
}

export const getters = {
    getBackground: (state) => {
        return state.backgroundImage
    }
}