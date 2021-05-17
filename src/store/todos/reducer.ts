import { createSlice } from "@reduxjs/toolkit";
import { createTodo, toggleTodo } from "@business/rules/todo-rules";
import { fetchTodos } from "./thunks";
import { initialState, todosAdapter } from "./state";

export const { actions, name, reducer } = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: todosAdapter.addOne,
      prepare: (title: string) => ({ payload: createTodo(title) }),
    },
    removeTodo: todosAdapter.removeOne,
    toggleTodo: (state, action) => toggleTodo(state.entities[action.payload]),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.fetching = false;
        todosAdapter.addMany(state, action);
      });
  },
});
