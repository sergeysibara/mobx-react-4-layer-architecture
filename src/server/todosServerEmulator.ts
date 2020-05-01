import serverUtils from "./utils";
import {TodoModel, ResponseModel, ResponseList, DeleteResponse } from "./types";

let nextTodoId = 1;

const todosServerData: { list: TodoModel[] } = {
  list: []
};

const getList = params => {
  const visibilityFilter =
    params && params.filters && params.filters.visibility
      ? params.filters.visibility
      : "all";

  const filtered = todosServerData.list.filter(
    i =>
      (visibilityFilter === "active" && !i.completed) ||
      (visibilityFilter === "completed" && i.completed) ||
      visibilityFilter === "all"
  );
  return {
    results: filtered,
    count: todosServerData.list.length,
    isError: false
  };
};

export default {
  get: async (url, data, params = {}):
    Promise<ResponseModel | ResponseList> => {
    // params - instead url params for simplification
    await serverUtils.sleep(100);

    //for list
    if (url === "/todo") {
      return getList(params);
    }

    const id = serverUtils.parseTodoIdFromUrl(url);
    const foundTodo = todosServerData.list.find(i => i.id === id);
    return {
      model: foundTodo,
      isError: !!foundTodo
    };
  },

  post: async (url, { text }: {text: string}):
    Promise<ResponseModel> => {
    await serverUtils.sleep(100);

    const newTodo: TodoModel = {
      id: nextTodoId++,
      text,
      completed: false
    };

    todosServerData.list.push(newTodo);
    return {
      model: newTodo,
    };
  },

  patch: async (url, todoData):
    Promise<ResponseModel> => {
    await serverUtils.sleep(100);

    const id = serverUtils.parseTodoIdFromUrl(url);
    const foundTodo = todosServerData.list.find(i => i.id === id);
    Object.assign(foundTodo, todoData);

    return {
      model: foundTodo,
    };
  },

  delete: async (url):
    Promise<DeleteResponse> => {
    await serverUtils.sleep(100);
    const id = serverUtils.parseTodoIdFromUrl(url);

    const foundTodoIndex = todosServerData.list.findIndex(i => i.id === id);
    if (foundTodoIndex !== -1) {
      todosServerData.list.splice(foundTodoIndex, 1);
    }

    return {
      id,
      isError: foundTodoIndex === -1,
    };
  }
};
