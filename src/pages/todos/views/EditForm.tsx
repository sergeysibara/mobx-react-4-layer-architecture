import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useInputBind from "components/controls/useInputBind";
import { observer } from "mobx-react-lite";
import * as TodoStore from "../store";
import { TodoModel } from "../store";

const todoStore = TodoStore.getInstance();

const TodoForm = observer(() => {
  const todoModel = TodoStore.getInstance().editModel;
  const isNew = !todoModel;

  const [todoText, setTodoText, todoTextBind] = useInputBind(
    todoModel ? todoModel.text : ""
  );

  useEffect(() => {
    if (todoModel) {
      setTodoText(todoModel.text);
    }
  }, [todoModel, setTodoText]);

  const saveTodo = todoText => {
    const trimmedText = todoText.trim();

    if (trimmedText.length > 0) {
      if (todoModel) {
        todoStore.updateAction({ ...todoModel, text: trimmedText } as TodoModel);
        todoStore.clearEditModule();
      } else {
        todoStore.createAction({ text: trimmedText });
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
