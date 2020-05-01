export interface TodoModel {
  id: number;
  text: string;
  completed: boolean;
}

export interface ResponseModel {
  model?: TodoModel;
  isError?: boolean;
}

export interface ResponseList {
  results?: TodoModel[];
  count?: number;
  isError?: boolean;
}

export interface DeleteResponse {
  id: number;
  isError?: boolean;
}
