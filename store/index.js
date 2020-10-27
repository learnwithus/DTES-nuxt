export const state = () => ({
    header: {
        overlay: false,
        visible: true
    },
    background: {
        image: {
            current: null,
            next: null
        },
        dark: {
            current: false,
            next: false
        }
    },
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
        console.log("setting actual background dark state to: " + value)
        state.background.dark.current = value ? true : false;
    },
    beginTour(state) {
        state.tour.started = true;
    }
}

export const getters = {
    getBackgroundImage: (state) => {
        return state.background.image.current;
    },
    getBackgroundDark: (state) => {
        return state.background.dark.current;
    }
}