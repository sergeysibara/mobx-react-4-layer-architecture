import BaseApi from "modules/api/BaseApi";
import Identifiable from "modules/types/Identifiable";

// class TodoApi extend BaseApi // for extend and overriding

export interface TodoApiModel extends Identifiable {
  text: string;
  completed: boolean;
}

const todoApi = new BaseApi<TodoApiModel>("/todo");

export const getInstance = () => {
  return todoApi;
};
