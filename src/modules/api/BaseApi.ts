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
    config?: ObjectType
  ): Promise<ResponseModel<T>> => {
    return (await apiService.get(`${this._apiUrl}/${id}`, config)).data;
  };

  getList = async (
    config?: ObjectType
  ): Promise<ResponseList<T>> => {
    const results = (await apiService.get(this._apiUrl, config)).data;
    console.log(results);
    return {results: results} as ResponseList<T>;
  };

  create = async (
    modelData: ObjectType,
    config?: ObjectType
  ): Promise<ResponseModel<T>> => {
    return (await apiService.post(this._apiUrl, modelData, config)).data;
  };

  update = async (
    modelData: { id: number },
    config?: ObjectType
  ): Promise<ResponseModel<T>> => {
    return (await apiService.patch(`${this._apiUrl}/${modelData.id}`, modelData, config)).data;
  };

  delete = async (
    id: number,
    config?: ObjectType
  ): Promise<DeleteResponse> => {
      return (await apiService.delete(`${this._apiUrl}/${id}`, config)).data;
  };
}

export type BaseApiType = BaseApi<IIdentifiable>;
