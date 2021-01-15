import * as Api from "./api";
import { stores } from "App";
import * as SearchParamsStore from "./searchParamsStore";
import BaseActions from "modules/actions/BaseActions";

const api = Api.getInstance();
const searchParamsStore = SearchParamsStore.getInstance();

const todoActions = new BaseActions(stores.todoStore, searchParamsStore, api);

export const getInstance = () => {
  return todoActions;
};
