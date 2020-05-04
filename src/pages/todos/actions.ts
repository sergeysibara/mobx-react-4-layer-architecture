import * as Api from "./api";
import BaseActions from "modules/actions/BaseActions";

const api = Api.getInstance();

const todoActions = new BaseActions(api);

export const getInstance = () => {
  return todoActions;
};
