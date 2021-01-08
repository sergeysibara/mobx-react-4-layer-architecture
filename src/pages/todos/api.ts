import BaseApi from "modules/api/BaseApi";
import IIdentifiable from "modules/types/IIdentifiable";

// class TodoApi extend BaseApi // for extend and overriding

export interface TodoApiModel extends IIdentifiable {
  text: string;
  completed: boolean;
}

const todoApi = new BaseApi<TodoApiModel>("/todo");

export const getInstance = () => {
  return todoApi;
};
