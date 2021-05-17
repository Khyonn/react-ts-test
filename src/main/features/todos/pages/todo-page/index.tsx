import AddTodo from "@features/todos/components/add-todo";
import TodoList from "@features/todos/components/todo-list";
import * as fromTodos from "@store/todos";
import { useDispatch, useSelector } from "react-redux";

const TodoPage = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(fromTodos.selectors.selectIsFetching);
  const handleClickLoadTodos = () => {
    dispatch(fromTodos.actions.fetchTodos());
  };
  return (
    <>
      <AddTodo />
      {isFetching ? (
        "Chargement en cours"
      ) : (
        <>
          <button onClick={handleClickLoadTodos}>Load todos</button>
          <TodoList />
        </>
      )}
    </>
  );
};
export default TodoPage;
