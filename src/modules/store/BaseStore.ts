import { observable, action } from "mobx";
import { EditModule, FiltersType, ListModule, SearchParams } from "./types";
import Identifiable from "modules/types/Identifiable";
import BaseActions from "modules/actions/BaseActions";

/**
 * Base class for stores.
 *
 * It is not required for all stores to use BaseStore or BaseStore child class! For specific stores can
 * to use custom store class.
 *
 * Note:
 * instead modules in common state (list, searchParams, edit) can use multiple small stores:
 *   BaseListStore, BaseEditModelStore
 */
export default class BaseStore<TListItem extends Identifiable, TEditModel extends Identifiable> {
   @observable protected _state: {
    list: ListModule<TListItem>;
    searchParams: SearchParams;
    edit: EditModule<TEditModel>;
  } = {
    list: {
      results: []
    },
    searchParams: {
      filters: {},
      paging: {},
    },
    edit: {},
  };

  protected _actions: BaseActions;

  constructor(actions: BaseActions) {
    this._actions = actions;
  }

  get list(): TListItem[] {
    return this._state.list.results;
  }

  get editModel(): TEditModel | undefined {
    return this._state.edit.model;
  }

  get searchParams(): SearchParams {
    return this._state.searchParams;
  }

  get filters(): FiltersType | undefined {
    return this.searchParams ? this.searchParams.filters : undefined;
  }

  @action addToList = (item: TListItem) => {
    this.list.push(item);
  };

  @action clearEditModule = () => {
    this._state.edit = {};
  };

  @action updateListItem = (item: TListItem) => {
    const foundTodo = this.list.find(i => i.id === item.id);
    Object.assign(foundTodo, item);
  };

  @action setFilters = (filters: FiltersType) => {
    this.searchParams.filters = filters;
  };

  @action  getOneAction = async (id: number) => {
    this.clearEditModule();
    const model = await this._actions.getOne(id);
    if (model) {
      this._state.edit = { model } as EditModule<TEditModel>;
    }
  };

  @action getListAction = async () => {
    const {results, count} = await this._actions.getList(this.searchParams);
    if (results)
      this._state.list = {
        results: results as TListItem[],
        count: count
      };
  };

  @action createAction = async(modelData: object) => {
  const createdModel = await this._actions.create(modelData);
    if (createdModel) {
      return await this.getListAction(); // for apply filters
    }
  };

  @action updateAction = async (modelData: Identifiable) => {
    const updatedModel = await this._actions.update(modelData);
    if (updatedModel) {
      return await this.getListAction(); // for apply filters
    }
  };

  @action deleteAction = async (id: number) => {
    const isError = await this._actions.delete(id);
    if (!isError) {
      // delete from list
      const foundIndex = this.list.findIndex(i => i.id === id);
      if (foundIndex !== -1) {
        this.list.splice(foundIndex, 1);
      }
    }
  }

}
