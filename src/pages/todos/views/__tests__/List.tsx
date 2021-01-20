import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from '../List';
import { createBaseStore } from "modules/store/BaseStore";
import { StoresContext, ActionsContext } from "contexts";
import { ITodoModel } from "../../stores";
import /* BaseActions, */ { createBaseActions } from "modules/actions/BaseActions";
import { createSearchParamsStore } from "modules/store/SearchParamsStore";
import { createTodoAPI } from "../../api";

import initStylesAndConfig from "initStylesAndConfig";
//
// jest.mock('modules/actions/BaseActions'); // SoundPlayer is now a mock constructor
//
// beforeEach(() => {
//   // Clear all instances and calls to constructor and all methods:
//   // @ts-ignore
//   BaseActions.mockClear();
// });

const TEST_LI_TEXT = 'testTodoItem1';
const mockListData = {
  results: [
    { id: 1, title: TEST_LI_TEXT, completed: false },
    { id: 2, title: 'testTodoItem2', completed: true },
    { id: 3, title: 'testTodoItem3', completed: false }
  ]
};


describe('<TodoList />', () => {
  describe('TodoList', () => {
    test('should render item with a test text', () => {
      initStylesAndConfig();
      const todoStore = createBaseStore<ITodoModel, ITodoModel>();
      todoStore.setListState(mockListData);

      const stores = {
        todoStore: todoStore,
        todoSearchParamsStore: createSearchParamsStore()
      };

      const todoActions = createBaseActions(stores.todoStore, stores.todoSearchParamsStore, createTodoAPI());
      jest.spyOn(todoActions, 'getList').mockImplementation(async () => {
        console.info('call of dummy getList')
      });

      const actions = {
        todoActions: todoActions,
      };

      render(
        <StoresContext.Provider value={stores}>
          <ActionsContext.Provider value={actions}>
            <TodoList />
          </ActionsContext.Provider>
        </StoresContext.Provider>
      );
      expect(screen.getByText(TEST_LI_TEXT)).toBeInTheDocument();
    });

  });

});
