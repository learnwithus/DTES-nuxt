export default ({ app, store }) => {
    // Reset background request functions before moving to the next route
    app.router.beforeEach((to, from, next) => {
        // console.log(from)
        // console.log("beforeEach: " + store.state.background)
        if (from.name !== null) {
            store.commit("setBackgroundImage", null);
            store.commit("clearDarkBackgroundRequest");
        }
        // else store.commit("setBackgroundImage", "tour/tracey/background.jpg");
        next();
    });

    app.router.afterEach((to, from) => {
        // Don't run on first pageload
        // if (from.name !== null) {
        //     console.log(store.state);
        //     console.log("afterEach: " + store.state.background)

        //     // If the setBackgroundImage hasn't been called by the page at this point, remove the background image
        //     if (store.state.background.image.next === null) store.commit("clearBackgroundImage");
        //     // else update the background image to the new image
        //     else store.commit("updateBackgroundImage");

        //     if(store.state.background.dark.next == false) store.commit("setDarkBackground", false);
        //     else store.commit("setDarkBackground", true);

        // }


    });

}
