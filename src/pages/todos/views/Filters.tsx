import React from "react";
import Button from "@material-ui/core/Button";
import * as Store from "../searchParamsStore";
import { observer } from "mobx-react-lite";
import * as Actions from "../actions";
// import { FilterVisibility } from "../consts";

const actions = Actions.getInstance();
const store = Store.getInstance();

type MouseEventHandlerType = (e: React.MouseEvent, additionalParam: string) => void;

const FilterButton = observer<{
  children: React.ReactNode;
  completed?: boolean;
  onClick: MouseEventHandlerType; //or Function;
}>(({ children, completed, onClick, ...props }) => {
    const visibilityFilter = store.getFilters().completed;
    return (
      <Button
        variant="contained"
        style={{ marginLeft: "1rem" }}
        disabled={visibilityFilter === completed}
        onClick={e => {
          actions.setFilters({ completed });
          if (onClick) {
            onClick(e, completed ? completed.toString(): "" );
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
      <FilterButton onClick={onChange}>
        All
      </FilterButton>
      <FilterButton completed={false} onClick={onChange}>
        Active
      </FilterButton>
      <FilterButton completed={true} onClick={onChange}>
        Completed
      </FilterButton>
    </div>
  );
};

export default Filters;
