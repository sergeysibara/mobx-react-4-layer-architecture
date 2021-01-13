import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { observer } from "mobx-react-lite";
import * as TodoStore from "../store";
import * as Actions from "../actions";
import { TodoModel } from "../store";

const actions = Actions.getInstance();
const todoStore = TodoStore.getInstance();

// for update view without server
// import useStoreClone from 'modules/store/useStoreClone';
// const [todos, setLocalStoreState] = useStoreClone(todoStore.results);
//
// const handleChange = (item, index) => {
//   actions.update({ id: item.id, completed: !item.completed });
//
//   // for update without waiting api call
//   todos[index].completed = !item.completed;
//   setLocalStoreState(Array.from(todos));
// };

const TodoList = observer(() => {
  const handleChange = (item) => {
    actions.update({ id: item.id, completed: !item.completed } as TodoModel);
  };

  useEffect(()=>{
    actions.getList();
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
                actions.getOne(item.id);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={e => {
                e.stopPropagation(); // preventDefault
                actions.delete(item.id);
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
