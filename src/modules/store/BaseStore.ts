import { observable, action, makeObservable } from "mobx";
import { IEditState, IListState } from "./types";
import IIdentifiable from "modules/types/IIdentifiable";

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

  @action
  setListState(list: IListState<TListItem>) {
    this.listState = list;
  }

  @action
  addToList(item: TListItem) {
    this.list.push(item);
  }

  @action
  setEditState(editState: IEditState<TEditModel>) {
    this.editState = editState;
  }

  @action
  clearEditState() {
    this.editState = {};
  }

  @action
  updateListItem(item: TListItem) {
    const foundTodo = this.list.find(i => item && i.id === item.id);
    if (foundTodo && item) {
      Object.assign(foundTodo, item);
    }
  }

  @action
  deleteFromList(id: number) {
    const foundIndex = this.list.findIndex(i => i.id === id);
    if (foundIndex !== -1) {
      this.list.splice(foundIndex, 1);
    }
  }

}

export type BaseStoreType = BaseStore<IIdentifiable, IIdentifiable>;

// for using in app and in tests
export const createBaseStore =
  <TListItem extends IIdentifiable, TEditModel extends IIdentifiable>() =>
    (new BaseStore<TListItem, TEditModel>());
