import { configureStore, Store } from "@reduxjs/toolkit";
import * as fromTodos from "@store/todos";
import rootReducer from "@store/root-reducer";
import RootState from "@store/root-state";
import * as todosHttp from "@configs/http/todos-client";

jest.mock("@configs/http/todos-client");
const todosClient = todosHttp.default as any;

describe("store/todos", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
  });

  describe("todos/addTodo", () => {
    it("should add a todo", () => {
      expect(fromTodos.selectors.selectTotal(store.getState())).toBe(0);
      store.dispatch(fromTodos.actions.addTodo("Laundry"));
      expect(fromTodos.selectors.selectTotal(store.getState())).toBe(1);
      expect(fromTodos.selectors.selectAll(store.getState())[0].title).toBe(
        "Laundry"
      );
    });
  });

  describe("todos/removeTodo", () => {
    it("should remove the todo", () => {
      store.dispatch(fromTodos.actions.addTodo("Laundry"));
      const newTodoId = fromTodos.selectors.selectAll(store.getState())[0].id;

      expect(fromTodos.selectors.selectTotal(store.getState())).toBe(1);
      expect(store.dispatch(fromTodos.actions.removeTodo(newTodoId)));
      expect(fromTodos.selectors.selectTotal(store.getState())).toBe(0);
      expect(
        fromTodos.selectors.selectById(store.getState(), newTodoId)
      ).toBeUndefined();
    });
  });

  describe("todos/toggleTodo", () => {
    it("should toggle the todo state", () => {
      store.dispatch(fromTodos.actions.addTodo("Laundry"));
      const newTodo = fromTodos.selectors.selectAll(store.getState())[0];

      expect(newTodo.completed).toBe(false);
      expect(store.dispatch(fromTodos.actions.toggleTodo(newTodo.id)));
      expect(
        fromTodos.selectors.selectById(store.getState(), newTodo.id)?.completed
      ).toBe(true);
    });
  });

  describe("todos/fetchTodos", () => {
    it("should inform about request state", async () => {
      todosClient.get.mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(() => resolve({ data: [] }), 10);
        });
      });
      expect(fromTodos.selectors.selectIsFetching(store.getState())).toBe(
        false
      );
      const promise = store.dispatch(fromTodos.actions.fetchTodos() as any);
      expect(fromTodos.selectors.selectIsFetching(store.getState())).toBe(true);
      await promise;
      expect(fromTodos.selectors.selectIsFetching(store.getState())).toBe(
        false
      );
    });

    it("should inform about request state", async () => {
      todosClient.get.mockImplementationOnce(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(), 10);
        });
      });
      expect(fromTodos.selectors.selectIsFetching(store.getState())).toBe(
        false
      );
      const promise = store.dispatch(fromTodos.actions.fetchTodos() as any);
      expect(fromTodos.selectors.selectIsFetching(store.getState())).toBe(true);
      await promise;
      expect(fromTodos.selectors.selectIsFetching(store.getState())).toBe(
        false
      );
    });

    it("should not allow more than one request at the time", () => {
      let callNb = 0;
      todosClient.get.mockImplementationOnce(() => {
        callNb++;
        return new Promise((resolve) => {
          setTimeout(() => resolve({ data: [] }), 10);
        });
      });
      expect(fromTodos.selectors.selectIsFetching(store.getState())).toBe(
        false
      );
      store.dispatch(fromTodos.actions.fetchTodos() as any);
      store.dispatch(fromTodos.actions.fetchTodos() as any);
      expect(callNb).toBe(1);
    });
  });
});
