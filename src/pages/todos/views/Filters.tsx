import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import { observer } from "mobx-react-lite";
import Typography from "@material-ui/core/Typography";
import { ActionsContext, IActionsContextValue, IStoresContextValue, StoresContext } from "../../../App";

type MouseEventHandlerType = (e: React.MouseEvent, additionalParam: string) => void;

const FilterButton = observer<{
  children: React.ReactNode;
  completed?: boolean;
  onClick: MouseEventHandlerType; //or Function;
}>(({ children, completed, onClick, ...props }) => {
  const { todoSearchParamsStore } = useContext(StoresContext) as IStoresContextValue;
  const { todoActions } = useContext(ActionsContext) as IActionsContextValue;

    const visibilityFilter = todoSearchParamsStore.getFilters().completed;
    return (
      <Button
        variant="contained"
        style={{ marginLeft: "1rem" }}
        disabled={visibilityFilter === completed}
        onClick={e => {
          todoActions.setFilters({ completed });
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
      <Typography variant="h6" color="secondary">{"A fake server is used - https://jsonplaceholder.typicode.com."}</Typography>
      <Typography variant="h6" color="secondary">{"Changes are faked and aren't persisted! A changes will not work correctly with the fake server."}</Typography>
      <Typography variant="h6" color="secondary">{"Changes will be discarded after changing the filter bellow and after repeated updates an item!"}</Typography>
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
export { FilterButton };
