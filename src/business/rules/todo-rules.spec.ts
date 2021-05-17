import { Todo } from "@business/models/todo";
import { selectTodoId, createTodo, toggleTodo } from "./todo-rules";

describe("business/todo-rules", () => {
  describe("selectTodoId", () => {
    it("should return todo id", () => {
      expect(
        selectTodoId({ id: "1", completed: true, title: "any task" })
      ).toBe("1");
    });
  });

  describe("createTodo", () => {
    it("should not be completed by default", () => {
      expect(createTodo("Laundry").completed).toBe(false);
    });
  });

  describe("toggleTodo", () => {
    it("should always set todo state to its reverse value", () => {
      const todo: Todo = { title: "Laundry", completed: false, id: "any-id" };

      for (
        let i = 0, todoState = !todo.completed;
        i < 5;
        i++, todoState = todo.completed, toggleTodo(todo)
      ) {
        expect(todo.completed).toBe(!todoState);
      }
    });
  });
});
