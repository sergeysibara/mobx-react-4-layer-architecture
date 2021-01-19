import BaseActions from "modules/actions/BaseActions";
import { BaseStoreType } from "../../modules/store/BaseStore";
import { SearchParamsStoreType } from "../../modules/store/SearchParamsStore";
import { BaseApiType } from "../../modules/api/BaseApi";

// for using in app and in tests
export const createTodoActions = (todoStore: BaseStoreType, todoSearchParamsStore: SearchParamsStoreType, api: BaseApiType) => {
  return  new BaseActions(todoStore, todoSearchParamsStore, api);
};
