import { useState } from "react";
import { useDispatch } from "react-redux";
import * as fromTodos from "@store/todos";

const useAddTodo = () => {
  const dispatch = useDispatch();
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fromTodos.actions.addTodo(todoTitle));
    setTodoTitle("");
  };

  return { todoTitle, handleTitleChange, handleSubmit };
};

export default useAddTodo;
