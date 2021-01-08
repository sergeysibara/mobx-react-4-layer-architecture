import { observable, action, makeObservable } from "mobx";
import { EditModule, FiltersType, ListModule, SearchParams } from "./types";
import Identifiable from "modules/types/Identifiable";

/**
 * Base class for stores.
 *
 * It is not required for all stores to use BaseStore or BaseStore child class! For specific stores can
 * to use custom store class.
 *
 * Notes:
 * * You can use multiple small stores instead store with multiple states (list, searchParams, edit):
 *   BaseListStore, SearchParamsStore, BaseEditStore.
 * * You can use constructor function factory function or objects instead classes.
 */
export default class BaseStore<TListItem extends Identifiable, TEditModel extends Identifiable> {
  @observable
  protected listState: ListModule<TListItem> = {
    results: []
  };

  @observable
  protected searchParamsState: SearchParams = {
    filters: {},
    paging: {},
  };

  @observable
  protected editState: EditModule<TEditModel> = {
  };

  constructor() {
    makeObservable<BaseStore<TListItem, TEditModel>>(this);
  }

  get list(): TListItem[] {
    return this.listState.results;
  }

  get editModel(): TEditModel | undefined {
    return this.editState.model;
  }

  get searchParams(): SearchParams {
    return this.searchParamsState;
  }

  get filters(): FiltersType | undefined {
    return this.searchParams ? this.searchParams.filters : undefined;
  }

  @action setListModule(list: ListModule<TListItem>) {
    this.listState = list;
  }

  @action addToList(item: TListItem) {
    this.list.push(item);
  }

  @action setEditModule(editModule: EditModule<TEditModel>) {
    this.editState = editModule;
  }

  @action clearEditModule() {
    this.editState = {};
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
    this.searchParams.filters = filters;
  }
}
