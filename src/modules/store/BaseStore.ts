import { observable, action, makeObservable, computed, toJS } from "mobx";
import { IEditState, IListState, ISearchParamsState } from "./types";
import IIdentifiable from "modules/types/IIdentifiable";
import ObjectType from "modules/types/ObjectType";

/**
 * Base class for stores.
 *
 * It is not required for all stores to use BaseStore or BaseStore child class! For specific stores can
 * use custom store class.
 *
 * Notes:
 * * You can use multiple small stores instead store with multiple states (list, searchParams, edit):
 *   BaseListStore, SearchParamsStore, BaseEditStore.
 * * You can use constructor function factory function or objects instead classes.
 */
export default class BaseStore<TListItem extends IIdentifiable, TEditModel extends IIdentifiable> {
  @observable
  protected listState: IListState<TListItem> = {
    results: []
  };

  @observable
  protected searchParamsState: ISearchParamsState = {
    filters: {
      limit: 5,
      completed: false
    },
    paging: {},
  };

  @observable
  protected editState: IEditState<TEditModel> = {
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

  get searchParams(): ISearchParamsState {
    return this.searchParamsState;
  }

  get searchParamsJS(): ISearchParamsState {
    return toJS(this.searchParamsState);
  }

  get filters(): ObjectType {
    return this.searchParams?.filters;
  }

  @action
  setListModule(list: IListState<TListItem>): void {
    this.listState = list;
  }

  @action
  addToList(item: TListItem): void  {
    this.list.push(item);
  }

  @action
  setEditModule(editModule: IEditState<TEditModel>): void  {
    this.editState = editModule;
  }

  @action
  clearEditModule(): void  {
    this.editState = {};
  }

  @action
  updateListItem(item: TListItem): void  {
    const foundTodo = this.list.find(i => i.id === item.id);
    Object.assign(foundTodo, item);
  }

  @action
  deleteFromList(id: number): void  {
    const foundIndex = this.list.findIndex(i => i.id === id);
    if (foundIndex !== -1) {
      this.list.splice(foundIndex, 1);
    }
  }

  @action
  setFilters(filters: ObjectType): void  {
    this.searchParams.filters = filters;
  }
}

export type BaseStoreType = BaseStore<IIdentifiable, IIdentifiable>;
