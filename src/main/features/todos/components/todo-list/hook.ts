import { useDispatch, useSelector } from "react-redux";

import { Todo } from "@business/models/todo";
import * as fromTodos from "@store/todos";

const useTodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(fromTodos.selectors.selectAll);

  const handleChangeState = (todoId: string) => () => {
    dispatch(fromTodos.actions.toggleTodo(todoId));
  };

  const handleDeleteTodo = (todoId: string) => () => {
    dispatch(fromTodos.actions.removeTodo(todoId));
  };

  const getTodoId = (todo: Todo) => `todo-item-${todo.id}`;

  return {
    todos,
    handleChangeState,
    handleDeleteTodo,
    getTodoId,
  };
};

export default useTodoList;
