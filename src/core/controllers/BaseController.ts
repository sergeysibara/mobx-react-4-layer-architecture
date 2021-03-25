import { BaseListStoreType } from '../stores/BaseListStore';
import { BaseEditStoreType } from '../stores/BaseEditStore';
import { SearchParamsStoreType } from '../stores/SearchParamsStore';
import { BaseApiType } from '../api/BaseApi';
import { IIdentifiable, ObjectType } from '../types';
import { isIResponseError } from '../api/types';
import { toast } from 'react-toastify';

/**
 * Base class for controllers.
 * Used for call services (like api), update stores.
 */
export default class BaseController {
  constructor(
    private readonly _listStore: BaseListStoreType,
    private readonly _editStore: BaseEditStoreType,
    private readonly _searchParamsStore: SearchParamsStoreType,
    private readonly _api: BaseApiType,
  ) {}

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

  async getOne(id: number) {
    this.editStore.clearEditState();
    const response = await this.api.getOne(id);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.editStore.setEditState({ model: response.model });
    }
  }

  async getList() {
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
  }

  async create(modelData: ObjectType) {
    const response = await this.api.create(modelData);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      // await this.getList(); // variant for applying filters
      this.listStore.addToList(response.model);
    }
  }

  async update(model: IIdentifiable) {
    const response = await this.api.update(model);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      // await this.getList(); // variant for applying filters
      this.listStore.updateListItem(response.model);
    }
  }

  clearEditState() {
    this.editStore.clearEditState();
  }

  async delete(id: number) {
    const response = await this.api.delete(id);
    if (isIResponseError(response)) {
      toast.error(response.message);
    } else {
      this.listStore.deleteFromList(id);
      this.clearEditState();
    }
  }

  setFilters(filters: ObjectType) {
    this.searchParamsStore.setFilters(filters);
  }
}
