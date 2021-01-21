import apiService from "./apiService";
import {
  ResponseList,
  ResponseModel,
  DeleteResponse,
  IResponseError
} from "./types";
import IIdentifiable from "core/types/IIdentifiable";
import ObjectType from "core/types/ObjectType";

export default class BaseApi<T extends IIdentifiable> {
  private readonly _apiUrl: string;

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  getOne = async(
    id: number,
    params?: ObjectType
  ): Promise<ResponseModel<T> | IResponseError> => {

    try {
      const ret = await apiService.get(`${this._apiUrl}/${id}`, { params });
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  };

  getList = async (
    params?: ObjectType
  ): Promise<ResponseList<T> | IResponseError> => {
    try {
      const ret = await apiService.get(this._apiUrl, { params });
      return { results: ret.data || []};
    } catch (error) {
      return this.handleError(error);
    }
  };

  create = async (
    modelData: ObjectType,
    params?: ObjectType
  ): Promise<ResponseModel<T> | IResponseError> => {
    try {
      const ret = await apiService.post(this._apiUrl, modelData, { params });
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  };

  update = async (
    modelData: { id: number },
    params?: ObjectType
  ): Promise<ResponseModel<T> | IResponseError> => {
    try {
      const ret = await apiService.patch(`${this._apiUrl}/${modelData.id}`, modelData, { params });
      return { model: ret.data };
    } catch (error) {
      return this.handleError(error);
    }
  };

  delete = async (
    id: number,
    params?: ObjectType
  ): Promise<DeleteResponse | IResponseError> => {
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
      switch (e.response.status) {
        // case 400: {
        //   const { statusCode, ...errors } = e.response.data;
        //   message = Object.values(errors).join(' ');
        //   break;
        // }
        //
        // case 403:
        // case 404: {
        //   message = e.response.details || e.message;
        //   break;
        // }
        default: {
          message = e.message;
          break;
        }
      }
    }

    return { isError: true, message };
  };
}

export type BaseApiType = BaseApi<IIdentifiable>;
