import apiService, { ApiServiceResponseType } from "./apiService";
import {
  ResponseList,
  ResponseModel,
  DeleteResponse
} from "./types";
import IIdentifiable from "modules/types/IIdentifiable";
import ObjectType from "modules/types/ObjectType";
import { AxiosResponse } from "axios";

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
  ): Promise<ResponseModel<T>> => { //  AxiosResponse<any> => {

    try {
      const ret = await apiService.get(`${this._apiUrl}/${id}`, { params });
      return ret.data;
    } catch (error) {
      console.log(error);
      return error;
    }
    //const ret = await apiService.get(`${this._apiUrl}/${id}`, { params })
      // .then(response => response.data)
      // .catch((e: Error) => {
      // console.log(e);
      //return e as Promise<ResponseModel<T>>

    //console.log(ret);
   // return ret; //Error
  };

  getList = async (
    params?: ObjectType
  ): Promise<ResponseList<T>> => {
    const results = (await apiService.get(this._apiUrl, { params })).data;
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
    const ret = (await apiService.patch(`${this._apiUrl}/${modelData.id}`, modelData, { params }));
    console.log(ret);
    return ret.data;
  };

  delete = async (
    id: number,
    params?: ObjectType
  ): Promise<DeleteResponse> => {
      return (await apiService.delete(`${this._apiUrl}/${id}`, { params })).data;
  };
}

export type BaseApiType = BaseApi<IIdentifiable>;
