import { createSlice } from "@reduxjs/toolkit";

//*create variable that we want redux to stroe for us
//*this object configure the redux "state"
const initialAuthState = {
  loggedIn: false,
  isAdmin: false,
  userInfo: null,
};

const authSlice = createSlice({
  //*for redux use
  name: "auth",
  //*initial state
  initialState: initialAuthState,
  //* functions to manipulate the state
  //* the functions inside the reducers calld actions
  reducers: {
    //* we will call this function when we login to update redux "state" that the user is logged in
    login(state, action) {
      state.loggedIn = true;
      state.isAdmin = action.payload.isAdmin;
      state.userInfo = action.payload;
    },
    //* we will call this function when we logout to update redux "state" that the user is logged out
    logout: (state) => initialAuthState,
    updateUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    addToWishList(state, { payload }) {
      state.userInfo.wishList.push(payload);
    },
    removeFromWishList(state, { payload }) {
      state.userInfo.wishList = payload;
    },
  },
});

//* export the actions (the functions that manipulate the "state")
//* so we can use them from other components/pages
//* this is how we can get access to this actions to update/manipulate the "state".
export const authActions = authSlice.actions;

//* export the actions, the state and the other configurations to redux (index.js) of reduxso redux can configure the "big state"
export default authSlice.reducer;
