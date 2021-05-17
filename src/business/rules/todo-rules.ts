import { Todo } from "@business/models/todo";
import { nanoid } from "@reduxjs/toolkit";

export const selectTodoId = (todo: Todo) => todo.id;

export const toggleTodo = (todo: Todo | undefined) => {
  if (todo) {
    todo.completed = !todo.completed;
  }
};

export const createTodo = (title: string): Todo => ({
  id: nanoid(),
  title,
  completed: false,
});
