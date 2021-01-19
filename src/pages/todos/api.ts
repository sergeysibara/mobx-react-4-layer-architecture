import BaseApi from "modules/api/BaseApi";
import IIdentifiable from "modules/types/IIdentifiable";

export interface ITodoApiModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

// for using in app and in tests
export const createTodoAPI = () => {
  return new BaseApi<ITodoApiModel>("/todos");
};
