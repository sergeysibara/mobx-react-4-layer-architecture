import { observable, action, computed, makeObservable } from 'mobx';
import { IIdentifiable, ErrorType } from '../types';

export interface IEditState<TEditModel extends IIdentifiable> {
  model?: TEditModel;
  isLoading?: boolean;
  error?: ErrorType;
}

/**
 * Base class for stores.
 */
export default class BaseEditStore<TEditModel extends IIdentifiable> {
  @observable
  protected editState: IEditState<TEditModel> = {};

  constructor() {
    makeObservable<BaseEditStore<TEditModel>>(this);
  }

  @computed
  get editModel(): TEditModel | undefined {
    return this.editState.model;
  }

  @action
  setEditState(editState: IEditState<TEditModel>) {
    this.editState = editState;
  }

  @action
  clearEditState() {
    this.editState = {};
  }
}

export type BaseEditStoreType = BaseEditStore<IIdentifiable>;
