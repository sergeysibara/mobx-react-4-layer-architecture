import apiService from "./apiService";
import {
  ResponseList,
  ResponseModel,
  DeleteResponse
} from "./types";
import Identifiable from "modules/types/Identifiable";

export default class BaseApi<T extends Identifiable> {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getOne = async (id: number): Promise<ResponseModel<T>> => {
    return (await apiService.get(`${this.apiUrl}/${id}`)) as Promise<
      ResponseModel<T>
    >;
  };

  getList = async (params: object): Promise<ResponseList<T>> => {
    return (await apiService.get(this.apiUrl, params)) as Promise<
      ResponseList<T>
    >;
  };

  create = async (modelData: object): Promise<ResponseModel<T>> => {
    return (await apiService.post(this.apiUrl, modelData)) as Promise<
      ResponseModel<T>
    >;
  };

  update = async (modelData: { id: number }): Promise<ResponseModel<T>> => {
    return (await apiService.patch(
      `${this.apiUrl}/${modelData.id}`,
      modelData
    )) as Promise<ResponseModel<T>>;
  };

  delete = async (id: number): Promise<DeleteResponse> => {
    return await apiService.delete(`${this.apiUrl}/${id}`);
  };
}
