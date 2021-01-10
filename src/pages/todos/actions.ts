import * as Api from "./api";
import * as MainStore from "./store";
import * as SearchParamsStore from "./searchParamsStore";
import BaseActions from "modules/actions/BaseActions";

const api = Api.getInstance();
const mainStore = MainStore.getInstance();
const searchParamsStore = SearchParamsStore.getInstance();

const todoActions = new BaseActions(mainStore, searchParamsStore, api);

export const getInstance = () => {
  return todoActions;
};
