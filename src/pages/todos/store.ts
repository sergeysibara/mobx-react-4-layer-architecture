import BaseStore from "modules/store/BaseStore";
import IIdentifiable from "modules/types/IIdentifiable";

export interface ITodoModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

export type TodoStoreType = BaseStore<ITodoModel, ITodoModel>;

// for using in app and in tests
export const createTodoStore = () => (new BaseStore<ITodoModel, ITodoModel>());
