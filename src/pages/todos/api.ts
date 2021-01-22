import BaseApi from 'core/api/BaseApi';
import IIdentifiable from 'core/types/IIdentifiable';

export interface ITodoApiModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

// for using in app and in tests
export const createTodoAPI = () => {
  return new BaseApi<ITodoApiModel>('/todos');
};
