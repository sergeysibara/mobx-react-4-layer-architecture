import BaseStore from "modules/store/BaseStore";
import { BaseModel } from "modules/store/types";
import { FilterVisibility } from "./consts";
import { computed } from "mobx";

export interface TodoModel extends BaseModel {
  text: string;
  completed: boolean;
}

export class TodoStore extends BaseStore<TodoModel, TodoModel> {
  @computed get visibilityFilter(): string {
    return this.filters && this.filters.visibility
      ? (this.filters.visibility as string)
      : FilterVisibility.All;
  }
}

const todoStore = new TodoStore();
const getInstance = () => {
  return todoStore;
};

export { getInstance };
