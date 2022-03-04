import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../services/blogApi";
import { cryptoApi } from "../services/cryptoApi";

//redux store-nista bez googla
export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
});
