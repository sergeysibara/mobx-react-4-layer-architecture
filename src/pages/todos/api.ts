import BaseApi from "modules/api/BaseApi";
import IIdentifiable from "modules/types/IIdentifiable";

export interface TodoApiModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

const todoApi = new BaseApi<TodoApiModel>("/todos");

export const getInstance = () => {
  return todoApi;
};
