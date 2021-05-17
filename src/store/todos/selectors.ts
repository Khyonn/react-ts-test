import { createSelector } from "@reduxjs/toolkit";
import RootState from "@store/root-state";
import { todosAdapter } from "./state";
import { name } from "./reducer";

const selectFeatureState = (state: RootState) => state[name];

export const { selectAll, selectById, selectEntities, selectIds, selectTotal } =
  todosAdapter.getSelectors(selectFeatureState);

export const selectIsFetching = createSelector(
  selectFeatureState,
  (state) => state.fetching
);
