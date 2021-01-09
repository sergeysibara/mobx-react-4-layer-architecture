import React from "react";
import Button from "@material-ui/core/Button";
import * as TodoStore from "../store";
import { observer } from "mobx-react-lite";
import * as Actions from "../actions";
import { FilterVisibility } from "../consts";

const actions = Actions.getInstance();
const todoStore = TodoStore.getInstance();

type MouseEventHandlerType = (e: React.MouseEvent, additionalParam: string) => void;

const FilterButton = observer<{
  children: React.ReactNode;
  filterValue: string;
  onClick: MouseEventHandlerType; //or Function;
}>(({ children, filterValue, onClick, ...props }) => {
    const visibilityFilter = todoStore.visibilityFilter;
    return (
      <Button
        variant="contained"
        style={{ marginLeft: "1rem" }}
        disabled={visibilityFilter === filterValue}
        onClick={e => {
          actions.setFilters({ visibility: filterValue });
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

const Filters = ({ onChange }: {onChange: MouseEventHandlerType}) => {
  return (
    <div>
      <span>Show: </span>
      <FilterButton filterValue={FilterVisibility.All} onClick={onChange}>
        All
      </FilterButton>
      <FilterButton filterValue={FilterVisibility.Active} onClick={onChange}>
        Active
      </FilterButton>
      <FilterButton filterValue={FilterVisibility.Completed} onClick={onChange}>
        Completed
      </FilterButton>
    </div>
  );
};

export default Filters;
