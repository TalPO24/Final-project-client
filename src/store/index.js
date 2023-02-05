import auth from "./auth";

const { configureStore } = require("@reduxjs/toolkit");

//* initial the global redux "state"
const store = configureStore({
    reducer: {
        auth: auth,
    },
});

export default store;