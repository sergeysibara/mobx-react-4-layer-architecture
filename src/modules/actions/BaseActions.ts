import BaseStore from "modules/store/BaseStore";
import { BaseModel } from "modules/store/types";
import BaseApi from "modules/api/BaseApi";
import { BaseApiModel } from "modules/api/types";

/**
 * Base class for action group.
 * Actions - it is middleware in this examples. Used for all api, update stores, other middleware logic.
 *
 * It is not required for all action groups to use BaseActions or BaseActions child class! For specific action groups
 * can to use custom actions class.
 */
export default class BaseActions {
  mainStore: BaseStore<BaseModel, BaseModel>;
  api: BaseApi<BaseApiModel>;

  constructor(mainStore: BaseStore<BaseModel, BaseModel>, api) {
    this.mainStore = mainStore;
    this.api = api;
  }

  getOne = async (id: number) => {
    this.mainStore.clearEditModule();
    const response = await this.api.getOne(id);
    if (response.model) this.mainStore.setEditModule({ model: response.model });
  };

  getList = async () => {
    const searchParams = this.mainStore.searchParams;
    const response = await this.api.getList(searchParams);
    if (response.results)
      this.mainStore.setListModule({
        results: response.results,
        count: response.count
      });
  };

  create = async (modelData: object) => {
    const response = await this.api.create(modelData);
    if (response.model) {
      await this.getList(); // for apply filters
      // this.mainStore.addToList(response.model);
    }
  };

  update = async (model: BaseModel) => {
    const editModule = await this.api.update(model);
    if (editModule.model) {
      await this.getList(); // for apply filters
      //this.mainStore.updateListItem(editModule.model);
    }
  };

  clearEditModule = () => {
    this.mainStore.clearEditModule();
  };

  delete = async (id: number) => {
    const response = await this.api.delete(id);
    if (!response.isError) {
      this.mainStore.deleteFromList(id);
    }
  };

  setFilters = filterParams => {
    this.mainStore.setFilters(filterParams);
  };
}
