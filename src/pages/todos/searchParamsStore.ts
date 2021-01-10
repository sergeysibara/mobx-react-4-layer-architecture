import SearchParamsStore, { IFiltersState, SearchParamsStoreType } from "modules/store/SearchParamsStore";
// import { FilterVisibility } from "./consts";
// import { computed, trace } from "mobx";
//
export interface ITodoFiltersState extends IFiltersState {
  completed?: boolean;
}

// todo НАСЛЕДОВАНИЕ ПРОВЕРИТЬ, что state будет работать (конструктор не забыть переопределить)
// export class SearchParamsTodoStores extends SearchParamsStore<IFiltersState> {
//   @computed get visibilityFilter(): string {
//     return this.filters && (this.filters.visibility)
//       ? (this.filters.visibility as string)
//       : FilterVisibility.All;
//   }
// }

const todoStore = new SearchParamsStore<ITodoFiltersState>({
  completed: true,
});
const getInstance = () => {
  return todoStore;
};

export { getInstance };
