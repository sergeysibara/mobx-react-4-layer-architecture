import React from "react";
import Button from "@material-ui/core/Button";
import * as TodoStore from "../store";
import { observer } from "mobx-react-lite";
import { FilterVisibility } from "../consts";

const todoStore = TodoStore.getInstance();

type MouseEventHandlerType = (e: React.MouseEvent, additionalParam: string) => void;

const FilterButton = observer<{
  children: React.ReactNode;
  filterValue: string;
  onClick: MouseEventHandlerType; //or Function;
}>(({ children, filterValue, onClick, ...props }) => {
    const visibilityFilter = TodoStore.getInstance().visibilityFilter;
    return (
      <Button
        variant="contained"
        style={{ marginLeft: "1rem" }}
        disabled={visibilityFilter === filterValue}
        onClick={e => {
          todoStore.setFilters({ visibility: filterValue });
          onClick(e, filterValue);
          if (onClick) {
            onClick(e, filterValue);
          }
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

const Filters = () => {
  return (
    <div>
      <span>Show: </span>
      <FilterButton filterValue={FilterVisibility.All} onClick={todoStore.getListAction}>
        All
      </FilterButton>
      <FilterButton filterValue={FilterVisibility.Active} onClick={todoStore.getListAction}>
        Active
      </FilterButton>
      <FilterButton filterValue={FilterVisibility.Completed} onClick={todoStore.getListAction}>
        Completed
      </FilterButton>
    </div>
  );
};

export default Filters;
