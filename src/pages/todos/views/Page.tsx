import React from "react";
import EditForm from "./EditForm";
import List from "./List";
import Filters from "./Filters";
import * as Actions from "../actions";

const actions = Actions.getInstance();

export default function Page() {
  return (
    <>
      <h1>Todos</h1>
      <EditForm />
      <Filters onChange={actions.getList} />
      <List />
    </>
  );
}
