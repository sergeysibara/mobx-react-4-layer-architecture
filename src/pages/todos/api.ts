import BaseApi from "modules/api/BaseApi";
import { BaseApiModel } from "modules/api/types";

// class TodoApi extend BaseApi // for extend and overriding

export interface TodoApiModel extends BaseApiModel {
  text: string;
  completed: boolean;
}

const todoApi = new BaseApi<TodoApiModel>("/todo");

export const getInstance = () => {
  return todoApi;
};
