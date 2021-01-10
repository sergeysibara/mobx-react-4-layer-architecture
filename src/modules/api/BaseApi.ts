import apiService from "./apiService";
import {
  ResponseList,
  ResponseModel,
  DeleteResponse
} from "./types";
import IIdentifiable from "modules/types/IIdentifiable";
import ObjectType from "modules/types/ObjectType";

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
    params?: ObjectType
  ): Promise<ResponseModel<T>> => {
    return (await apiService.get(`${this._apiUrl}/${id}`, { params })).data;
  };

  getList = async (
    params?: ObjectType
  ): Promise<ResponseList<T>> => {
    const results = (await apiService.get(this._apiUrl, { params })).data;
    console.log(results);
    return {results: results} as ResponseList<T>;
  };

  create = async (
    modelData: ObjectType,
    params?: ObjectType
  ): Promise<ResponseModel<T>> => {
    return (await apiService.post(this._apiUrl, modelData, { params })).data;
  };

  update = async (
    modelData: { id: number },
    params?: ObjectType
  ): Promise<ResponseModel<T>> => {
    return (await apiService.patch(`${this._apiUrl}/${modelData.id}`, modelData, { params })).data;
  };

  delete = async (
    id: number,
    params?: ObjectType
  ): Promise<DeleteResponse> => {
      return (await apiService.delete(`${this._apiUrl}/${id}`, { params })).data;
  };
}

export type BaseApiType = BaseApi<IIdentifiable>;
