import { observable, action } from "mobx";
import { BaseModel, EditModule, FiltersType, ListModule, SearchParams } from "./types";

/**
 * Base class for stores.
 *
 * It is not required for all stores to use BaseStore or BaseStore child class! For specific stores can
 * to use custom store class.
 *
 * Note:
 * instead modules in common state (list, searchParams, edit) can use multiple small stores:
 *   BaseListStore, SearchParamsStore, BaseEditModelStore, BaseSelectedItemStore
 */
export default class BaseStore<TListItem extends BaseModel, TeditModel extends BaseModel> {
  @observable state: {
    list: ListModule<TListItem>;
    searchParams: SearchParams;
    edit: EditModule<TeditModel>;
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

  get list(): TListItem[] {
    return this.state.list.results;
  }

  get editModel(): TeditModel | undefined {
    return this.state.edit.model;
  }

  get searchParams(): SearchParams {
    return this.state.searchParams;
  }

  get filters(): FiltersType | undefined {
    return this.searchParams ? this.searchParams.filters : undefined;
  }

  @action setListModule(list: ListModule<TListItem>) {
    this.state.list = list;
  }

  @action addToList(item: TListItem) {
    this.list.push(item);
  }

  @action setEditModule(editModule: EditModule<TeditModel>) {
    this.state.edit = editModule;
  }

  @action clearEditModule() {
    this.state.edit = {};
  }

  @action updateListItem(item: TListItem) {
    const foundTodo = this.list.find(i => i.id === item.id);
    Object.assign(foundTodo, item);
  }

  @action deleteFromList(id: number) {
    const foundIndex = this.list.findIndex(i => i.id === id);
    if (foundIndex !== -1) {
      this.list.splice(foundIndex, 1);
    }
  }

  @action setFilters(filters: FiltersType) {
    this.state.searchParams.filters = filters;
  }
}
