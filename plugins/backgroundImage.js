export default ({ app, store }) => {

    app.router.beforeEach((to, from, next) => {
        console.log(from)
        console.log("beforeEach: " + store.state.backgroundImage)
        if (from.name !== null) store.commit("setBackgroundImage", null);
        // else store.commit("setBackgroundImage", "tour/tracey/background.jpg");
        next();
    });

    app.router.afterEach((to, from) => {
        // Don't run on first pageload
        if (from.name !== null) {
            console.log(store.state);
            console.log("afterEach: " + store.state.newBackgroundImage)

            if (store.state.newBackgroundImage === null) store.commit("clearBackgroundImage");
            else store.commit("updateBackgroundImage");

        }


    });

}
