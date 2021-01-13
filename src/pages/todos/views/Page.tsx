import React from "react";
import EditForm from "./EditForm";
import List from "./List";
import Filters from "./Filters";
import * as Actions from "../actions";
import Typography from '@material-ui/core/Typography';

const actions = Actions.getInstance();

export default function Page() {
  return (
    <>
      <Typography variant="h4">Todos Demo</Typography>
      <EditForm />
      <Filters onChange={actions.getList} />
      <List />
    </>
  );
}
