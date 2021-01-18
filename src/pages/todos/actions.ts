import * as Api from "./api";
import BaseActions from "modules/actions/BaseActions";
import { BaseStoreType } from "../../modules/store/BaseStore";
import { SearchParamsStoreType } from "../../modules/store/SearchParamsStore";

const api = Api.getInstance();

// for using in app and in tests
export const createTodoActions = (todoStore: BaseStoreType, todoSearchParamsStore: SearchParamsStoreType ) => {
  return  new BaseActions(todoStore, todoSearchParamsStore, api);
};
