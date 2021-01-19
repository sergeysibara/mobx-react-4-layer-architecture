import React, { useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useInputBind from "components/controls/useInputBind";
import { observer } from "mobx-react-lite";
import { IActionsContextValue, IStoresContextValue, ActionsContext, StoresContext} from "contexts";
import { ITodoModel } from "../stores";

const TodoForm = observer(() => {
    const { todoStore } = useContext(StoresContext) as IStoresContextValue;
    const { todoActions } = useContext(ActionsContext) as IActionsContextValue;

  const todoModel = todoStore?.editModel;
  const isNew = !todoModel;

  const [todoText, setTodoText, todoTextBind] = useInputBind(
    todoModel ? todoModel.title : ""
  );

  useEffect(() => {
    if (todoModel) {
      setTodoText(todoModel.title);
    }
  }, [todoModel, setTodoText]);

  const saveTodo = todoText => {
    const trimmedText = todoText.trim();

    if (trimmedText.length > 0) {
      if (todoModel) {
        todoActions.update({ ...todoModel, title: trimmedText } as ITodoModel);
        todoActions.clearEditState();
      } else {
        todoActions.create({ title: trimmedText });
      }
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    saveTodo(todoText);
    setTodoText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        placeholder={`${isNew ? "add" : "edit"} todo`}
        label={`Press Enter for ${isNew ? "add" : "edit"} todo`}
        margin="normal"
        {...todoTextBind}
      />
    </form>
  );
});

export default TodoForm;
