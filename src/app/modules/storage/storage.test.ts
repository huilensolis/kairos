import { expect, test, describe, expectTypeOf, beforeEach } from "vitest"
import { StorageModel, type TData } from "./storage"

// it looks like storage does not persist between tests.
beforeEach(() => {
    StorageModel.clear()
})

describe("Storage", () => {

    describe('clear method', () => {
        const items = [

            { key: '1', data: 'some data' }
            , { key: '2', data: 'some data' }
            , { key: '3', data: 'some data' }
            , { key: '4', data: 'some data' }
        ]

        test('clear method clears stored data', () => {

            for (const item of items) {
                StorageModel.saveItem(item)
            }

            StorageModel.clear()

            for (const item of items) {
                const { error, item: itemReturn } = StorageModel.getItem(item)
                expect(error).toBeTruthy()
                expect(itemReturn).toBeNull()
            }


        })
    })

    describe('saveItem method', () => {

        const invalidKeyTypes = [
            null,
            undefined,
            900719925124740999n,
            NaN,
            true,
            { someObjectKey: '' },
            ['test']
            , ''
        ]

        test.each(invalidKeyTypes)('should handle invalid key type: %p', (invalidKey) => {
            const data = 'data in a valid format'

            const { error } = StorageModel.saveItem({ key: invalidKey as any, data })

            expectTypeOf(error as string).toBeString()
            expect(error).toBeTruthy()
        });

        const invalidData = [
            null,
            undefined,
            900719925124740999n,
            NaN,
            , ''
        ]

        test.each(invalidData)('should handle invalid data type: %p', (invalidData) => {
            const key = Date.now() + Math.floor(Math.random() * 1000);

            const { error } = StorageModel.saveItem({ key: key.toString(), data: invalidData as string })

            expectTypeOf(error as string).toBeString()
            expect(error).toBeTruthy()
        });

        test('saving an item with the same key twice should return an error', () => {
            const key = '123'
            const data = 'test data in string'

            const { error: error1 } = StorageModel.saveItem({ key, data })
            const { error: error2 } = StorageModel.saveItem({ key, data })

            expect(error1).toBeNull()

            expect(error2).toBeTruthy()
            expectTypeOf(error2 as string).toBeString()

            const itemDataFromLocalStorage = localStorage.getItem(key)

            expect(itemDataFromLocalStorage).toEqual(expect.stringContaining(data))
        })

    })

    describe('getItem method', () => {

        const items = [
            { key: '1', data: 'string' },
            { key: '2', data: 1 },
            { key: '3', data: { key: 'an object as data' } },
            { key: '4', data: ['an array as data'] },
            { key: '5', data: true },
        ]

        test.each(items)("getItem should return item in the same data type it was saved: typeof %p", item => {
            const { error } = StorageModel.saveItem(
                { key: item.key, data: item.data }
            )

            expect(error).toBeNull()

            const { item: returnedItem } = StorageModel.getItem({ key: item.key })

            // we validate the array type manually, since the the type of an array is 'object' and we cannot check it with expect().tobeTypeof('array')
            if (typeof item.data === 'object' && Array.isArray(item.data)) {
                const isReturnedItemAnArray = Array.isArray(returnedItem)
                expect(isReturnedItemAnArray).toEqual(true)
            }

            expect(returnedItem).toBeTypeOf(typeof item.data)


        })

        test('getItem with an inexisting key returns an error', () => {
            // the key isalways going to be unique, since on top of this file we are clearing the storage before each test!
            const { error, item } = StorageModel.getItem({ key: '123' })

            expect(error).toBeTruthy()
            expect(error).toBeTypeOf('string')
            expect(error).not.toHaveLength(0)

            expect(item).toBeNull()
        })
    })

    describe("removeItem Method", () => {
        test('item is actually removed from storage', () => {

            const key = 'myKey'
            const data = 'this is a test item'

            const { error: errorSavingItem } = StorageModel.saveItem({ key, data })
            expect(errorSavingItem).toBeNull()

            StorageModel.removeItem({ key })

            const { error, item } = StorageModel.getItem({ key })
            expect(error).toBeTruthy()
            expect(error).toBeTypeOf('string')
            expect(error).not.toHaveLength(0)
            expect(item).toBeNull()
        })
    })

    describe("updateItem Method", () => {
        describe('item is updated', () => {
            const items: Array<{ key: string, data: TData }> = [
                { key: '1', data: 'a string' },
                { 'key': '2', data: { name: 'user name', age: '32' } },
                { 'key': '3', data: ['an array', 'as data'] },
                { 'key': '3', data: true },
                { key: '4', data: 123 },
            ]

            for (let i = 0; i < items.length; i++) {
                test('item should be updated from one data type to another', () => {

                    const { data: firstData, key } = items[i === 0 ? 2 : i - 1]

                    const { error } = StorageModel.saveItem({ key, data: firstData })
                    expect(error).toBeNull()

                    const newData = items[i].data
                    const { error: errorUpdatingItem } = StorageModel.updateItem({ key, data: newData })
                    expect(errorUpdatingItem).toBeNull()

                    const { item, error: errorGettingItem } = StorageModel.getItem({ key })
                    expect(item).toBeTruthy()
                    expect(item).toBeTypeOf(typeof newData)
                    expect(item).toEqual(newData)
                    expect(item).not.toEqual(firstData)
                    expect(errorGettingItem).toBeNull()
                })

            }
        })

        test('updating a non-existing item return an error', () => {
            const { error } = StorageModel.updateItem({ key: 'unexisting_key', data: 'my new data' })

            expect(error).toBeTruthy()
            expect(error).toBeTypeOf('string')
            expect(error).not.toHaveLength(0)
        })
    })

    test.todo("subscribeToItemChanges Method")
    //    subscribeToItemChanges Method
    //Test if the callback is triggered when the item with the specified key is changed in another tab.
    //Verify the oldValue, newValue, and url values passed to the callback.

    test.todo("subscribeToStorageChanges Method")
    //subscribeToStorageChanges Method
    //Test if the callback is triggered for any changes in localStorage in another tab.
    //Validate the structure of the itemChanges object (should include key, oldValue, newValue, and url).


    test.todo("localStorage not avaialble edge case")
    //Test in incognito mode or private browsing where localStorage might be restricted.


    test.todo("benchmark writing and reading data")
    // benchmark local storage saving and reading
})
