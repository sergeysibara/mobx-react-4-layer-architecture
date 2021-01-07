import apiService from "./apiService";
import {
  ResponseList,
  ResponseModel,
  DeleteResponse
} from "./types";
import Identifiable from "modules/types/Identifiable";
import ObjectType from "modules/types/ObjectType";

export default class BaseApi<T extends Identifiable> {
  protected _apiUrl: string;

  get apiUrl(): string {
    return this._apiUrl;
  }

  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  getOne = async (id: number): Promise<ResponseModel<T>> => {
    return (await apiService.get(`${this._apiUrl}/${id}`)) as Promise<
      ResponseModel<T>
    >;
  };

  getList = async (params: ObjectType): Promise<ResponseList<T>> => {
    return (await apiService.get(this._apiUrl, params)) as Promise<
      ResponseList<T>
    >;
  };

  create = async (modelData: ObjectType): Promise<ResponseModel<T>> => {
    return (await apiService.post(this._apiUrl, modelData)) as Promise<
      ResponseModel<T>
    >;
  };

  update = async (modelData: { id: number }): Promise<ResponseModel<T>> => {
    return (await apiService.patch(
      `${this._apiUrl}/${modelData.id}`,
      modelData
    )) as Promise<ResponseModel<T>>;
  };

  delete = async (id: number): Promise<DeleteResponse> => {
    return await apiService.delete(`${this._apiUrl}/${id}`);
  };
}
