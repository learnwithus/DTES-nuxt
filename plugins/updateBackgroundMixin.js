import Vue from 'vue'
// Updates background when new page begind to transition in
Vue.mixin({
    transition: {
        enter(el) {
            console.log('enter', el)

            console.log(this.$store.state);
            // console.log("afterEach: " + this.$store.state.background)

            // If the setBackgroundImage hasn't been called by the page at this point, remove the background image
            if (this.$store.state.background.image.next === null) this.$store.commit("clearBackgroundImage");
            // else update the background image to the new image
            else this.$store.commit("updateBackgroundImage");

            if (this.$store.state.background.dark.next == false) this.$store.commit("setDarkBackground", false);
            else this.$store.commit("setDarkBackground", true);

        },
        afterLeave(el) {
            console.log('afterLeave', el)
        }
    },
    // beforeRouteLeave(to, from, next) {

    //     next((vm) => {
    //         console.log("beforeRouteLeave")
    //         vm.$store.commit("setBackgroundImage", null);
    //         vm.$store.commit("clearDarkBackgroundRequest");
    //     });
    // },
    // beforeDestroy() {

    // }

})