import { configureStore } from "@reduxjs/toolkit";
import * as fromRouter from "./router";
import reducer from "./root-reducer";

export default configureStore({
  reducer,
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat([fromRouter.middleware]),
});
