import { combineReducers } from "redux";
import * as fromRouter from "./router";
import * as fromTodos from "./todos";

export default combineReducers({
  [fromRouter.name]: fromRouter.reducer,
  [fromTodos.name]: fromTodos.reducer,
});
