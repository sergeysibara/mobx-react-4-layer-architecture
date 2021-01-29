/**
 * Demonstration that actions can be tested
 */

import BaseActions from '../BaseActions';
import { BaseListStoreType } from '../../store/BaseListStore';
import { BaseEditStoreType } from '../../store/BaseEditStore';
import { SearchParamsStoreType } from '../../store/SearchParamsStore';
import { BaseApiType } from '../../api/BaseApi';
import { IIdentifiable } from '../../types';

describe('Todo actions', () => {
  describe('Update', () => {
    test('should update item in store', async () => {
      expect.assertions(3);
      const testItem = { id: 1, value: 'testValue' } as IIdentifiable;

      const mockedApi = {
        update: jest.fn(async (modelData) => {
          return {
            model: modelData,
          };
        }),
      };

      const mockedStore = {
        updateListItem: jest.fn((newItem) => {
          expect(newItem).toEqual(testItem);
        }),
      };

      const actions = new BaseActions(
        (mockedStore as unknown) as BaseListStoreType,
        ({} as unknown) as BaseEditStoreType,
        ({} as unknown) as SearchParamsStoreType,
        (mockedApi as unknown) as BaseApiType,
      );

      await actions.update(testItem);
      expect(mockedApi.update.mock.calls.length).toBe(1);
      expect(mockedStore.updateListItem.mock.calls.length).toBe(1);
    });
  });
});
