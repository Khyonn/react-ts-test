import { selectTodoId } from "./todo-rules";

describe("business/todo-rules", () => {
  it("should return todo id", () => {
    expect(selectTodoId({ id: "1", completed: true, title: "any task" })).toBe(
      "1"
    );
  });
});
