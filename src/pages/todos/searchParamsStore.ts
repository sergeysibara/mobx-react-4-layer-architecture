import SearchParamsStore, {
  IFiltersState,
} from "modules/store/SearchParamsStore";

export interface ITodoFiltersState extends IFiltersState {
  completed?: boolean;
}

// // inheritance example
// export class SearchParamsTodoStore<T extends ITodoFiltersState> extends SearchParamsStore<IFiltersState> {
//   protected pagingState: PagingStateType = {
//     _limit: 5
//   };
//
//   protected filtersState: ITodoFiltersState = {
//     completed: false
//   };
//
//   // constructor(filters?: T, paging?: PagingStateType, sorting?: SortingStateType) {
//   //   super(filters, paging, sorting);
//   //   makeObservable(this);
//   // }
//
//   @computed get visibilityFilter() {
//     return (this.filtersState as T).completed;
//   }
// }

const todoStore = new SearchParamsStore<ITodoFiltersState>({
  completed: undefined,
});
const getInstance = () => {
  return todoStore;
};

export { getInstance };
