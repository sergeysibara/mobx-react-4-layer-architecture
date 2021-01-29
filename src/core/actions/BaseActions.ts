import { BaseListStoreType } from '../store/BaseListStore';
import { BaseEditStoreType } from '../store/BaseEditStore';
import { SearchParamsStoreType } from '../store/SearchParamsStore';
import { BaseApiType } from '../api/BaseApi';
import { IIdentifiable, ObjectType } from '../types';
import { isIResponseError } from '../api/types';
import { toast } from 'react-toastify';

/**
 * Base class for action group.
 * Actions - it is side effects in this example. Used for call api, update stores, other business logic.
 */
export default class BaseActions {
  private readonly _listStore: BaseListStoreType;
  private readonly _editStore: BaseEditStoreType;
  private readonly _searchParamsStore: SearchParamsStoreType;
  private readonly _api: BaseApiType;

  get listStore(): BaseListStoreType {
    return this._listStore;
  }

  get editStore(): BaseEditStoreType {
    return this._editStore;
  }

  get searchParamsStore(): SearchParamsStoreType {
    return this._searchParamsStore;
  }

  get api(): BaseApiType {
    return this._api;
  }

  constructor(
    listStore: BaseListStoreType,
    editStore: BaseEditStoreType,
    searchParamsStore: SearchParamsStoreType,
    api: BaseApiType,
  ) {
    this._listStore = listStore;
    this._editStore = editStore;
    this._searchParamsStore = searchParamsStore;
    this._api = api;
  }

  getOne = async (id: number) => {
    this.editStore.clearEditState();
    const response = await this.api.getOne(id);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.editStore.setEditState({ model: response.model });
    }
  };

  getList = async () => {
    const searchParams = this._searchParamsStore.getSearchParamsMergedToJS();
    const response = await this.api.getList(searchParams);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.listStore.setListState({
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
      this.listStore.addToList(response.model);
    }
  };

  update = async (model: IIdentifiable) => {
    const response = await this.api.update(model);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      // await this.getList(); // for apply filters
      this.listStore.updateListItem(response.model);
    }
  };

  clearEditState = () => {
    this.editStore.clearEditState();
  };

  delete = async (id: number) => {
    const response = await this.api.delete(id);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.listStore.deleteFromList(id);
      this.clearEditState();
    }
  };

  setFilters = (filters: ObjectType) => {
    this.searchParamsStore.setFilters(filters);
  };
}
