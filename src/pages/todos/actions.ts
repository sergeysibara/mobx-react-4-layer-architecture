import * as Api from "./api";
import * as MainStore from "./store";
import BaseActions from "modules/actions/BaseActions";

const api = Api.getInstance();
const mainStore = MainStore.getInstance();

const todoActions = new BaseActions(mainStore, api);

export const getInstance = () => {
  return todoActions;
};
