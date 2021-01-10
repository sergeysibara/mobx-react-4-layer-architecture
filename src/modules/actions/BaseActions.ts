import { BaseStoreType } from "modules/store/BaseStore";
import { SearchParamsStoreType } from "modules/store/SearchParamsStore";
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
  private readonly _searchParamsStore: SearchParamsStoreType;
  private readonly _api: BaseApiType;

  get mainStore(): BaseStoreType {
      return this._mainStore;
  }

  get searchParamsStore(): SearchParamsStoreType {
    return this._searchParamsStore;
  }

  get api(): BaseApiType {
    return this._api;
  }

  constructor(mainStore: BaseStoreType, searchParamsStore: SearchParamsStoreType, api: BaseApiType) {
    this._mainStore = mainStore;
    this._searchParamsStore = searchParamsStore;
    this._api = api;
  }

  getOne = async (id: number): Promise<void> => {
    this.mainStore.clearEditState();
    const response = await this.api.getOne(id);
    if (response.model) {
      this.mainStore.setEditState({ model: response.model });
    }
  };

  getList = async (): Promise<void> => {
    const searchParams = this._searchParamsStore.getSearchParamsMergedToJS();
    const response = await this.api.getList(searchParams);
    if (response.results)
      this.mainStore.setListState({
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
    this.mainStore.clearEditState();
  };

  delete = async (id: number): Promise<void> => {
    const response = await this.api.delete(id);
    if (!response.isError) {
      this.mainStore.deleteFromList(id);
    }
  };

  setFilters = (filters: ObjectType): void => {
    console.log(filters);
    this.searchParamsStore.setFilters(filters);
  };
}
