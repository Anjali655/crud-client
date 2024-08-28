// store.js
import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../features/userDetailSlice";

const store = configureStore({
  reducer: {
    userDetail: userDetailReducer, // Ensure the reducer is correctly referenced here
  },
});

export default store;
