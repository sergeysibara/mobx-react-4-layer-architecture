import apiService from './apiService';
import {
  IResponseList,
  IResponseModel,
  IDeleteResponse,
  IResponseError,
} from './types';
import { IIdentifiable, ObjectType } from '../types';

export default class BaseApi<T extends IIdentifiable> {
  private readonly _apiUrl: string;

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  getOne = async (
    id: number,
    params?: ObjectType,
  ): Promise<IResponseModel<T> | IResponseError> => {
    try {
      const ret = await apiService.get(`${this._apiUrl}/${id}`, { params });
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  };

  getList = async (
    params?: ObjectType,
  ): Promise<IResponseList<T> | IResponseError> => {
    try {
      const ret = await apiService.get(this._apiUrl, { params });
      return { results: ret.data || [] };
    } catch (error) {
      return this.handleError(error);
    }
  };

  create = async (
    modelData: ObjectType,
    params?: ObjectType,
  ): Promise<IResponseModel<T> | IResponseError> => {
    try {
      const ret = await apiService.post(this._apiUrl, modelData, { params });
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  };

  update = async (
    modelData: { id: number },
    params?: ObjectType,
  ): Promise<IResponseModel<T> | IResponseError> => {
    try {
      const ret = await apiService.patch(
        `${this._apiUrl}/${modelData.id}`,
        modelData,
        { params },
      );
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  };

  delete = async (
    id: number,
    params?: ObjectType,
  ): Promise<IDeleteResponse | IResponseError> => {
    try {
      const ret = await apiService.delete(`${this._apiUrl}/${id}`, { params });
      return { id: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  };

  protected handleError = (e): IResponseError => {
    let message = '';
    if (e.response) {
      message = e.message;
    }

    return { isError: true, message };
  };
}

export type BaseApiType = BaseApi<IIdentifiable>;
