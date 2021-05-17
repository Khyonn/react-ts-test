import store from "@store/index";

type RootState = ReturnType<typeof store.getState>;
export default RootState;
