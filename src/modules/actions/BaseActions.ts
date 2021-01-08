import BaseStore from "modules/store/BaseStore";
import IIdentifiable from "modules/types/IIdentifiable";
import ObjectType from "modules/types/ObjectType";
import BaseApi from "modules/api/BaseApi";

/**
 * Base class for action group.
 * Actions - it is middleware in this examples. Used for all api, update stores, other middleware logic.
 *
 * It is not required for all action groups to use BaseActions or BaseActions child class! For specific action groups
 * can to use custom actions class.
 */
export default class BaseActions {
  protected _mainStore: BaseStore<IIdentifiable, IIdentifiable>;
  protected _api: BaseApi<IIdentifiable>;

  get mainStore(): BaseStore<IIdentifiable, IIdentifiable> {
      return this._mainStore;
  }

  get api(): BaseApi<IIdentifiable> {
    return this._api;
  }

  constructor(mainStore: BaseStore<IIdentifiable, IIdentifiable>, api) {
    this._mainStore = mainStore;
    this._api = api;
  }

  getOne = async (id: number) => {
    this._mainStore.clearEditModule();
    const response = await this._api.getOne(id);
    if (response.model) {
      this._mainStore.setEditModule({ model: response.model });
    }
  };

  getList = async () => {
    const searchParams = this._mainStore.searchParams;
    const response = await this._api.getList(searchParams as unknown as ObjectType);
    if (response.results)
      this._mainStore.setListModule({
        results: response.results,
        count: response.count
      });
  };

  create = async (modelData: ObjectType) => {
    const response = await this._api.create(modelData);
    if (response.model) {
      await this.getList(); // for apply filters
      // this._mainStore.addToList(response.model);
    }
  };

  update = async (model: IIdentifiable) => {
    const editModule = await this._api.update(model);
    if (editModule.model) {
      await this.getList(); // for apply filters
      //this._mainStore.updateListItem(editModule.model);
    }
  };

  clearEditModule = () => {
    this._mainStore.clearEditModule();
  };

  delete = async (id: number) => {
    const response = await this._api.delete(id);
    if (!response.isError) {
      this._mainStore.deleteFromList(id);
    }
  };

  setFilters = filterParams => {
    this._mainStore.setFilters(filterParams);
  };
}
