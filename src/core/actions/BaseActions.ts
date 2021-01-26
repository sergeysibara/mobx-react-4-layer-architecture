import { BaseStoreType } from '../store/BaseStore';
import { SearchParamsStoreType } from '../store/SearchParamsStore';
import { BaseApiType } from '../api/BaseApi';
import IIdentifiable from '../types/IIdentifiable';
import ObjectType from '../types/ObjectType';
import { isIResponseError } from '../api/types';
import { toast } from 'react-toastify';

/**
 * Base class for action group.
 * Actions - it is side effects in this example. Used for call api, update stores, other business logic.
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

  getOne = async (id: number) => {
    this.mainStore.clearEditState();
    const response = await this.api.getOne(id);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.mainStore.setEditState({ model: response.model });
    }
  };

  getList = async () => {
    const searchParams = this._searchParamsStore.getSearchParamsMergedToJS();
    const response = await this.api.getList(searchParams);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.mainStore.setListState({
        results: response.results,
        count: response.count,
      });
    }
  };

  create = async (modelData: ObjectType) => {
    const response = await this.api.create(modelData);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      // await this.getList(); // for apply filters
      this.mainStore.addToList(response.model);
    }
  };

  update = async (model: IIdentifiable) => {
    const response = await this.api.update(model);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.mainStore.updateListItem(response.model);
      // await this.getList(); // for apply filters
    }
  };

  clearEditState = () => {
    this.mainStore.clearEditState();
  };

  delete = async (id: number) => {
    const response = await this.api.delete(id);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.mainStore.deleteFromList(id);
    }
  };

  setFilters = (filters: ObjectType) => {
    this.searchParamsStore.setFilters(filters);
  };
}
