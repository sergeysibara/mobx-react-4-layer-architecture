import BaseStore from "modules/store/BaseStore";
import Identifiable from "modules/types/Identifiable";
import BaseApi from "modules/api/BaseApi";
import { ListModule } from "../store/types";

/**
 * Base class for action group.
 * Actions - it is middleware in this examples. Used for all api, update stores, other middleware logic.
 *
 * It is not required for all action groups to use BaseActions or BaseActions child class! For specific action groups
 * can to use custom actions class.
 */
export default class BaseActions {
  protected _api: BaseApi<Identifiable>;

  get api(): BaseApi<Identifiable> {
    return this._api;
  }

  constructor(api) {
    this._api = api;
  }

  getOne = async (id: number): Promise<Identifiable | undefined> => {
    const response = await this._api.getOne(id);
    return response.model;
  };

  getList = async (searchParams: object): Promise<ListModule<Identifiable>> => {
    return await this._api.getList(searchParams) as ListModule<Identifiable>;
  };

  create = async (modelData: object): Promise<Identifiable | undefined> =>  {
    const response = await this._api.create(modelData);
    return response.model;
  };

  update = async (model: Identifiable): Promise<Identifiable | undefined> => {
    const response = await this._api.update(model);
    return response.model;
  };

  delete = async (id: number): Promise<boolean> => {
    const response = await this._api.delete(id);
    return response.isError === true;
  };

}
