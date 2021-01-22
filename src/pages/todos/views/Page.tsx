import React, { useContext } from 'react';
import EditForm from './EditForm';
import List from './List';
import Filters from './Filters';
import Typography from '@material-ui/core/Typography';
import { IActionsContextValue, ActionsContext } from 'contexts';

export default function Page() {
  const { todoActions } = useContext(ActionsContext) as IActionsContextValue;
  return (
    <>
      <Typography variant="h4">Todos Demo</Typography>
      <EditForm />
      <Filters onChange={todoActions.getList} />
      <List />
    </>
  );
}
