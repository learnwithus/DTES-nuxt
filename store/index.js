export const state = () => ({
    header: {
        overlay: false,
        visible: true
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
    }
}
