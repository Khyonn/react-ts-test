import { Todo } from "@business/models/todo";
import todosClient from "@configs/http/todos-client";
import { createAsyncThunk } from "@reduxjs/toolkit";
import RootState from "@store/root-state";
import { selectIsFetching } from "./selectors";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async () => (await todosClient.get<Todo[]>("/todos")).data.slice(0, 20),
  {
    condition: (_, { getState }) => !selectIsFetching(getState() as RootState),
  }
);
