/**
 * Demonstration that controllers can be tested
 */

import BaseController from '../BaseController';
import { BaseListStoreType } from '../../stores/BaseListStore';
import { BaseEditStoreType } from '../../stores/BaseEditStore';
import { SearchParamsStoreType } from '../../stores/SearchParamsStore';
import { BaseApiType } from '../../api/BaseApi';
import { IIdentifiable } from '../../types';

describe('Base controller', () => {
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

      const controllers = new BaseController(
        (mockedStore as unknown) as BaseListStoreType,
        ({} as unknown) as BaseEditStoreType,
        ({} as unknown) as SearchParamsStoreType,
        (mockedApi as unknown) as BaseApiType,
      );

      await controllers.update(testItem);
      expect(mockedApi.update.mock.calls.length).toBe(1);
      expect(mockedStore.updateListItem.mock.calls.length).toBe(1);
    });
  });
});
