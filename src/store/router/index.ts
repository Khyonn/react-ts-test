import { connectRouter, routerMiddleware } from "connected-react-router";
import history from "@configs/history";

export const name = "router";
export const reducer = connectRouter(history);
export const middleware = routerMiddleware(history);
