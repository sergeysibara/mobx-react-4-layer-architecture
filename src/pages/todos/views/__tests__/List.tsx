/**
 * Demonstration that components can be tested
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from '../List';
import { createBaseStore } from 'core/store/BaseStore';
import { StoresContext, ActionsContext } from 'contexts';
import { ITodoModel } from '../../stores';
import { createSearchParamsStore } from 'core/store/SearchParamsStore';

const TEST_LI_TEXT = 'testTodoItem1';
const mockListData = {
  results: [
    { id: 1, title: TEST_LI_TEXT, completed: false },
    { id: 2, title: 'testTodoItem2', completed: true },
    { id: 3, title: 'testTodoItem3', completed: false },
  ],
};

describe('<TodoList />', () => {
  describe('TodoList', () => {
    test('should render item with a test text', () => {
      const todoStore = createBaseStore<ITodoModel, ITodoModel>();
      todoStore.setListState(mockListData);

      const stores = {
        todoStore: todoStore,
        todoSearchParamsStore: createSearchParamsStore(),
      };

      const mockedActions = {
        getList: jest.fn(async () => {}),
      };

      const actions = {
        todoActions: mockedActions,
      };

      render(
        <StoresContext.Provider value={stores}>
          <ActionsContext.Provider value={actions}>
            <TodoList />
          </ActionsContext.Provider>
        </StoresContext.Provider>,
      );

      expect(mockedActions.getList.mock.calls.length).toBe(1);
      expect(screen.getByText(TEST_LI_TEXT)).toBeInTheDocument();
    });
  });
});
