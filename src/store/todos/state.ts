import { createEntityAdapter } from "@reduxjs/toolkit";
import { selectTodoId } from "@business/rules/todo-rules";

export const todosAdapter = createEntityAdapter({
  selectId: selectTodoId,
});
export const initialState = todosAdapter.getInitialState({
  fetching: false,
});
export type State = typeof initialState;
