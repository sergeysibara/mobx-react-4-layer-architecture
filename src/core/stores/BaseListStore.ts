import { observable, action, makeObservable, computed } from 'mobx';
import { IIdentifiable, ErrorType } from '../types';

export interface IListState<TListItem extends IIdentifiable> {
  results: TListItem[];
  count?: number; // number of all items on server
  isLoading?: boolean;
  error?: ErrorType;
}

/**
 * Base class for stores.
 */
export default class BaseListStore<TListItem extends IIdentifiable> {
  @observable
  protected listState: IListState<TListItem> = {
    results: [],
  };

  constructor() {
    makeObservable<BaseListStore<TListItem>>(this);
  }

  @computed
  get list(): TListItem[] {
    return Array.isArray(this.listState.results) ? this.listState.results : [];
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
  updateListItem(item: TListItem) {
    const foundTodo = this.list.find((i) => item && i.id === item.id);
    if (foundTodo && item) {
      Object.assign(foundTodo, item);
    }
  }

  @action
  deleteFromList(id: number) {
    const foundIndex = this.list.findIndex((i) => i.id === id);
    if (foundIndex !== -1) {
      this.list.splice(foundIndex, 1);
    }
  }
}

export type BaseListStoreType = BaseListStore<IIdentifiable>;
