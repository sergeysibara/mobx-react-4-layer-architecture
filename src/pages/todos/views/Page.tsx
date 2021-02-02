import React, { useContext } from 'react';
import EditForm from './EditForm';
import List from './List';
import Filters from './Filters';
import Typography from '@material-ui/core/Typography';
import { IControllersContextValue, ControllersContext } from 'contexts';

export default function Page() {
  const { todoController } = useContext(
    ControllersContext,
  ) as IControllersContextValue;
  return (
    <>
      <Typography variant="h4">Todos Demo</Typography>
      <EditForm />
      <Filters onChange={todoController.getList} />
      <List />
    </>
  );
}
