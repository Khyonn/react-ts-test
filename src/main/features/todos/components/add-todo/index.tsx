import useHook from "./hook";
import style from "./style.module.scss";

const AddTodo = () => {
  const { todoTitle, handleTitleChange, handleSubmit } = useHook();

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
      />
      <button className={style["add-todo-btn"]} type="submit">
        Ajouter
      </button>
    </form>
  );
};

export default AddTodo;
