export const state = () => ({
    header: {
        overlay: false,
        visible: true
    },
    backgroundImage: undefined
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
    setBackgroundImage(state, value){
        console.log("setting background to: " + value)
        if(value !== state.backgroundImage) state.backgroundImage = value;
        console.log(state);
    },
    clearBackgroundImage(state){
        state.backgroundImage = undefined;
    }
}
