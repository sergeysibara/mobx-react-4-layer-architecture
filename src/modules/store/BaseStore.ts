import { runInAction, makeAutoObservable } from "mobx";
import { EditModule, FiltersType, ListModule, SearchParams } from "./types";
import Identifiable from "modules/types/Identifiable";

/**
 * Base class for stores.
 * actions in store - is only setters for state.
 *
 * It is not required for all stores to use BaseStore or BaseStore child class! For specific stores can
 * to use custom store class.
 *
 * Note:
 * instead modules in common state (list, searchParams, edit) can use multiple small stores:
 *   BaseListStore, BaseEditModelStore
 */

// todo: use https://www.npmjs.com/package/mobx-undecorate
/** todo: use makeAutoObservable(_state, {
 * setEditModule: action
 *  }) instead runInAction
 *  */
export default class BaseStore<TListItem extends Identifiable, TEditModel extends Identifiable> {
  public _state: {
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

  constructor() {
    makeAutoObservable(this._state);
    //makeAutoObservable(this.#list); // эти private будут ли работать в наследникак (т.е. private это или protected?)
    //makeAutoObservable(this.#searchParams);
    //makeAutoObservable(this.#edit);
    //makeAutoObservable(null, {actions});
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

  setListModule(list: ListModule<TListItem>) {
    runInAction(() => {
      this._state.list = list;
    });
  }

  addToList(item: TListItem) {
    runInAction(() => {
      this.list.push(item);
    });
  }

  setEditModule(editModule: EditModule<TEditModel>) {
    runInAction(() => {
      this._state.edit = editModule;
    });
  }

  clearEditModule() {
    runInAction(() => {
      this._state.edit = {};
    });
  }

  updateListItem(item: TListItem) {
    runInAction(() => {
      const foundTodo = this.list.find(i => i.id === item.id);
      Object.assign(foundTodo, item);
    });
  }

  deleteFromList(id: number) {
    runInAction(() => {
      const foundIndex = this.list.findIndex(i => i.id === id);
      if (foundIndex !== -1) {
        this.list.splice(foundIndex, 1);
      }
    });
  }

  setFilters(filters: FiltersType) {
    runInAction(() => {
      console.log(filters);
      this._state.searchParams.filters = filters;
    });
  }
}
