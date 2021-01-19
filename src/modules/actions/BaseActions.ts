import { BaseStoreType } from "modules/store/BaseStore";
import { SearchParamsStoreType } from "modules/store/SearchParamsStore";
import { BaseApiType } from "modules/api/BaseApi";
import IIdentifiable from "modules/types/IIdentifiable";
import ObjectType from "modules/types/ObjectType";
import { isIResponseError } from "modules/api/types";
import { toast } from 'react-toastify';

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
    if (isIResponseError(response)) {
      toast.error(response.message);
    }
    else {
      this.mainStore.setEditState({ model: response.model });
    }
  };

  getList = async (): Promise<void> => {
    const searchParams = this._searchParamsStore.getSearchParamsMergedToJS();
    const response = await this.api.getList(searchParams);
    if (isIResponseError(response)) {
      toast.error(response.message);
    }
    else {
      this.mainStore.setListState({
        results: response.results,
        count: response.count
      });
    }

  };

  create = async (modelData: ObjectType): Promise<void> => {
    const response = await this.api.create(modelData);
    if (isIResponseError(response)) {
      toast.error(response.message);
    }
    else {
      // await this.getList(); // for apply filters
      this.mainStore.addToList(response.model);
    }
    // if (response) {
    //   // await this.getList(); // for apply filters
    //   this.mainStore.addToList(response as IIdentifiable);
    // }
  };

  update = async (model: IIdentifiable): Promise<void> => {
    const response = await this.api.update(model);
    if (isIResponseError(response)) {
      toast.error(response.message);
    }
    else {
      this.mainStore.updateListItem(response.model);
    }
    // if (response) {
    //   // await this.getList(); // for apply filters
    //   this.mainStore.updateListItem(response as IIdentifiable);
    // }
  };

  clearEditState = (): void => {
    this.mainStore.clearEditState();
  };

  delete = async (id: number): Promise<void> => {
    const response = await this.api.delete(id);
    if (isIResponseError(response)) {
      toast.error(response.message);
    }
    else {
      this.mainStore.deleteFromList(id);
    }
  };

  setFilters = (filters: ObjectType): void => {
    this.searchParamsStore.setFilters(filters);
  };
}

// for using in app and in tests
export const createBaseActions = (todoStore: BaseStoreType, todoSearchParamsStore: SearchParamsStoreType, api: BaseApiType) => {
  return new BaseActions(todoStore, todoSearchParamsStore, api);
};

