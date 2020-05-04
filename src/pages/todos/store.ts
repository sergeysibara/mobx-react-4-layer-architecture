import BaseStore from "modules/store/BaseStore";
import Identifiable from "modules/types/Identifiable";
import { FilterVisibility } from "./consts";
import { computed } from "mobx";
import * as Actions from "./actions";

export interface TodoModel extends Identifiable {
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

const todoStore = new TodoStore(Actions.getInstance());
const getInstance = () => {
  return todoStore;
};

export { getInstance };
