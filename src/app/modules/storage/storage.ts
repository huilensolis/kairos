export type TData = string | object | number | [unknown] | boolean
type TItemChanges = Pick<StorageEvent, 'key' | 'oldValue' | 'newValue' | 'url'>

export class StorageModel {
    constructor() {
        //
    }

    private static stringify(data: TData): { data: string } {

        if (typeof data === 'object' || typeof data === 'boolean') {
            const stringifiedData = JSON.stringify(data)

            return { data: stringifiedData }
        }

        if (typeof data === 'number') {
            return { data: data.toString() }
        }

        return { data }

    }

    private static isNumber(str: string) {
        if (str.length === 0) return false

        try {
            const isNotANumbe = isNaN(Number(str))

            if (!isNotANumbe) return true
        } catch {
            return false
        }

        return false
    }

    private static isJson(str: string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    static saveItem({ key, data }: { key: string, data: TData }): {
        error: null | string
    } {

        if (key.length === 0) return { error: 'key can not be an empty string' }
        if (key.split(' ').length > 1) return { error: 'key can not contain spaces' }

        if (typeof data === 'string' && data.length === 0) return { error: 'data lenght can not be zero' }
        if (typeof data === 'undefined') return { error: 'data cannot be undefined' }
        if (typeof data === 'number' && isNaN(data)) return { error: 'data cannot be NaN' }
        if (typeof data === 'bigint') return { error: 'data cannot be of type bigint' }

        const { data: stringifiedData } = this.stringify(data)

        const { error: errorGettingItem } = this.getItem({ key })
        const doesItemAlreadyExist = !errorGettingItem

        if (doesItemAlreadyExist) return { error: `an item with key: ${key} already exist. use the update method instead` }

        try {
            localStorage.setItem(key, stringifiedData)
            return { error: null }
        } catch (e) {
            console.log(e)
            return { error: 'unexpected error' }
        }


    }

    static getItem<T>({ key }: { key: string }): { item: T, error: null } | { item: null, error: string } {
        const item = localStorage.getItem(key)

        if (item) {
            if (this.isJson(item)) {
                const parsedData: object = JSON.parse(item)

                // return an object
                return { item: parsedData as T, error: null }
            }

            if (this.isNumber(item)) {
                const parsedData = Number(item)

                return { item: parsedData as T, error: null }
            }

            // if item is a string, return it raw
            return { item: item as T, error: null }
        }

        return { item: null, error: 'item not found' }
    }

    static removeItem({ key }: { key: string }) {
        localStorage.removeItem(key)
    }

    static updateItem({ key, data }: { key: string, data: TData }): { error: string | null } {
        const doesItemExist = localStorage.getItem(key)

        if (!doesItemExist) return { error: 'item does not exist' }

        const { data: stringifiedUpdatedData } = this.stringify(data)

        localStorage.setItem(key, stringifiedUpdatedData)

        return { error: null }
    }

    /**
     this only sends signals only when an item is changed FROM A DIFFERENT TAB.
     this is used to syncronize tabs; it will not trigger when updating a localstorage item from a single tab.
    */
    static subscribeToItemChanges(itemKey: string, callback: (itemChanges: Omit<TItemChanges, 'key'>) => void) {
        window.addEventListener("storage", (event: StorageEvent) => {
            // event can be triggered by session storage or localstorage.
            // check localstorage triggered the event.
            if (event.storageArea === localStorage) {
                const {
                    key,
                    oldValue,
                    newValue,
                    url // the url of the tab that made the change
                } = event

                if (key === itemKey) callback({ oldValue, newValue, url })

            }
        });
    }

    static subscribeToStorageChanges(callback: (itemChanges: TItemChanges) => void) {
        window.addEventListener("storage", (event: StorageEvent) => {
            // event can be triggered by session storage or localstorage.
            // check localstorage triggered the event.
            if (event.storageArea === localStorage) {
                const {
                    key,
                    oldValue,
                    newValue,
                    url // the url of the tab that made the change
                } = event

                callback({ key, oldValue, newValue, url })

            }
        });
    }

    static clear() {
        localStorage.clear()
    }

}
