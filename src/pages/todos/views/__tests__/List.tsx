/**
 * Demonstration that components can be tested
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from '../List';
import BaseListStore from 'core/stores/BaseListStore';
import {
  StoresContext,
  ControllersContext,
  IStoresContextValue,
  IControllersContextValue,
} from 'contexts';
import { ITodoModel } from '../../stores';

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
      const todoStore = new BaseListStore<ITodoModel>();
      todoStore.setListState(mockListData);

      const stores = {
        todoListStore: todoStore,
      } as IStoresContextValue;

      const mockedController = {
        getList: jest.fn(async () => {}),
      };

      const controllers = ({
        todoController: mockedController,
      } as unknown) as IControllersContextValue;

      render(
        <StoresContext.Provider value={stores}>
          <ControllersContext.Provider value={controllers}>
            <TodoList />
          </ControllersContext.Provider>
        </StoresContext.Provider>,
      );

      expect(mockedController.getList.mock.calls.length).toBe(1);
      expect(screen.getByText(TEST_LI_TEXT)).toBeInTheDocument();
    });
  });
});
