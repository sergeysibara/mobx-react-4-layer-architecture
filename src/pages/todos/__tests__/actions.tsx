// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import TodoList from '../List';
// import { createTodoStore } from "../../store";
// import { StoresContext, ActionsContext } from "contexts";
// import { createTodoActions } from "../../actions";
// import { createTodoSearchParamsStore } from "../../searchParamsStore";
//

//
// const TEST_LI_TEXT = 'testTodoItem1';
//
// const todoStore = createTodoStore();
// todoStore.setListState({
//   results: [
//     { id: 1, title: TEST_LI_TEXT, completed: false },
//     { id: 2, title: 'testTodoItem2', completed: true },
//     { id: 3, title: 'testTodoItem3', completed: false }
//   ]
// });
//
// const stores = {
//   todoStore: todoStore,
//   todoSearchParamsStore: createTodoSearchParamsStore()
// };
//
// const todoActions = createTodoActions(stores.todoStore, createTodoSearchParamsStore(), createTodoAPI());

// const actions = {
//   todoActions: todoActions,
// };

describe('Todo actions', () => {
  describe('TodoList', () => {
    test('should render item with a test text', () => {

      //expect(screen.getByText(TEST_LI_TEXT)).toBeInTheDocument();
    });
  });

});
