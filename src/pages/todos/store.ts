import BaseStore from "modules/store/BaseStore";
import IIdentifiable from "modules/types/IIdentifiable";

export interface ITodoModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

// for using in app and in tests
export const createTodoStore = () => (new BaseStore<ITodoModel, ITodoModel>());

// let _todoStore;
// const getInstance = () => {
//   if (_todoStore) {
//     _todoStore = createTodoStore();
//   }
//   return _todoStore;
// };
//
// export { getInstance };
