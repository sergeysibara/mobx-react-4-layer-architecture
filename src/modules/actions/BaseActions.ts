import { BaseStoreType } from "modules/store/BaseStore";
import { BaseApiType } from "modules/api/BaseApi";
import IIdentifiable from "modules/types/IIdentifiable";
import ObjectType from "modules/types/ObjectType";

/**
 * Base class for action group.
 * Actions - it is middleware in this examples. Used for all api, update stores, other middleware logic.
 *
 * It is not required for all action groups to use BaseActions or BaseActions child class! For specific action groups
 * can to use custom actions class.
 */
export default class BaseActions {
  private readonly _mainStore: BaseStoreType;
  private readonly _api: BaseApiType;

  get mainStore(): BaseStoreType {
      return this._mainStore;
  }

  get api(): BaseApiType {
    return this._api;
  }

  constructor(mainStore: BaseStoreType, api: BaseApiType) {
    this._mainStore = mainStore;
    this._api = api;
  }

  getOne = async (id: number): Promise<void> => {
    this.mainStore.clearEditModule();
    const response = await this.api.getOne(id);
    if (response.model) {
      this.mainStore.setEditModule({ model: response.model });
    }
  };

  getList = async (): Promise<void> => {
    const searchParams = this.mainStore.searchParamsJS;
    const filters = {...searchParams.filters, ...searchParams.paging, ...searchParams.sorting};
    const response = await this.api.getList(filters);
    if (response.results)
      this.mainStore.setListModule({
        results: response.results,
        count: response.count
      });
  };

  create = async (modelData: ObjectType): Promise<void> => {
    const response = await this.api.create(modelData);
    if (response.model) {
      await this.getList(); // for apply filters
      // this.mainStore.addToList(response.model);
    }
  };

  update = async (model: IIdentifiable): Promise<void> => {
    const editModule = await this.api.update(model);
    if (editModule.model) {
      await this.getList(); // for apply filters
      //this.mainStore.updateListItem(editModule.model);
    }
  };

  clearEditModule = (): void => {
    this.mainStore.clearEditModule();
  };

  delete = async (id: number): Promise<void> => {
    const response = await this.api.delete(id);
    if (!response.isError) {
      this.mainStore.deleteFromList(id);
    }
  };

  setFilters = (filterParams: ObjectType): void => {
    console.log(filterParams);
    this.mainStore.setFilters(filterParams);
  };
}
