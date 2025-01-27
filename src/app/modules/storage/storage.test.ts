import { expect, test, describe, expectTypeOf, beforeEach } from "vitest"
import { StorageModel } from "./storage"

// it looks like storage does not persist between tests.
beforeEach(() => {
    localStorage.clear()
})

describe("Storage", () => {
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
        true,
        , ''
    ]

    test.each(invalidData)('should handle invalid data type: %p', (invalidData) => {
        const key = Date.now() + Math.floor(Math.random() * 1000);

        const { error } = StorageModel.saveItem({ key: key.toString(), data: invalidData as string })

        expectTypeOf(error as string).toBeString()
        expect(error).toBeTruthy()
    });

    test('saving an item twice should return an error', () => {
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


    test.todo("getItem Method")
    //    getItem Method
    //Retrieve items stored with string, object, and number data types to ensure they are returned in their original form.
    //Test retrieving a non-existent key and confirm it returns an appropriate error.
    //Check if malformed or corrupted data in localStorage (e.g., invalid JSON) is handled gracefully.


    test.todo("removeItem Method")
    //    removeItem Method
    //Remove an existing item and ensure it no longer exists in localStorage.
    //Attempt to remove a non-existent item and confirm no error is thrown.

    test.todo("updateItem Method")
    //    updateItem Method
    //Update existing items with different data types and confirm the updated values.
    //Try updating a non-existent item and confirm it returns an appropriate error.


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
