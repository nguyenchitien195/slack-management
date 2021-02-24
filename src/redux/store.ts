import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import fileSlice from "./fileSlice";

const store = configureStore({
  reducer: {auth: authSlice.reducer, files: fileSlice.reducer}
});

export default store;