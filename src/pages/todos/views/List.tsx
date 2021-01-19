import React, { useEffect, useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { observer } from "mobx-react-lite";
import { IActionsContextValue, IStoresContextValue, ActionsContext, StoresContext } from "contexts";
import { ITodoModel } from "../stores";

const TodoList = observer( () => {
  const { todoStore } = useContext(StoresContext) as IStoresContextValue;
  const { todoActions } = useContext(ActionsContext) as IActionsContextValue;

  const handleChange = (item) => {
    todoActions.update({ id: item.id, completed: !item.completed } as ITodoModel);
  };

  useEffect(()=>{
    todoActions.getList();
  },[]);
  return (
    <List>
      {todoStore.list.map((item) => (
        <ListItem key={item.id} dense button>
          <Checkbox
            tabIndex={-1}
            disableRipple
            onChange={() => {
              handleChange(item);
            }}
            checked={item.completed || false}
            onClick={e => {
              e.stopPropagation(); // preventDefault
            }}
          />
          <ListItemText primary={item.title} />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Edit"
              onClick={e => {
                e.stopPropagation(); // preventDefault
                todoActions.getOne(item.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={e => {
                e.stopPropagation(); // preventDefault
                todoActions.delete(item.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
});

export default TodoList;
