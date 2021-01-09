import BaseStore from "modules/store/BaseStore";
import IIdentifiable from "modules/types/IIdentifiable";
import { FilterVisibility } from "./consts";
import { computed } from "mobx";

export interface TodoModel extends IIdentifiable {
  title: string;
  completed: boolean;
}

export class TodoStore extends BaseStore<TodoModel, TodoModel> {
  @computed get visibilityFilter(): string {
    return this.filters && (this.filters.visibility)
      ? (this.filters.visibility as string)
      : FilterVisibility.All;
  }
}

const todoStore = new TodoStore();
const getInstance = () => {
  return todoStore;
};

export { getInstance };
