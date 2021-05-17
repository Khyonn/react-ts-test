import useHook from "./hook";

const TodoList = () => {
  const { todos, handleChangeState, handleDeleteTodo, getTodoId } = useHook();

  if (todos.length) {
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <button onClick={handleDeleteTodo(todo.id)}>X</button>
            <input
              type="checkbox"
              id={getTodoId(todo)}
              checked={todo.completed}
              onChange={handleChangeState(todo.id)}
            />
            <label htmlFor={getTodoId(todo)}>{todo.title}</label>
          </li>
        ))}
      </ul>
    );
  }
  return null;
};
export default TodoList;
