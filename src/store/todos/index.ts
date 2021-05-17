import { actions as sliceActions } from "./reducer";
import * as thunks from "./thunks";
import * as selectors from "./selectors";

export type { State } from "./state";
export { name, reducer } from "./reducer";

const actions = {
  ...sliceActions,
  ...thunks,
};
export { actions, selectors };
