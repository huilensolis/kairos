type TData = string | object | number
type TItemChanges = Pick<StorageEvent, 'key' | 'oldValue' | 'newValue' | 'url'>

export class Storage {
    constructor() {
        //
    }

    private static stringify(data: TData): { data: string } {

        if (typeof data === 'object') {
            const stringifiedData = JSON.stringify(data)

            return { data: stringifiedData }
        } else if (typeof data === 'number') {
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

        const { data: stringifiedData } = this.stringify(data)

        const { error: errorGettingItem } = this.getItem({ key })
        const doesItemAlreadyExist = !errorGettingItem

        if (doesItemAlreadyExist) return { error: `an item with key: ${key} already exist. use the update method instead` }

        localStorage.setItem(key, stringifiedData)

        return { error: null }
    }

    static getItem({ key }: { key: string }): { item: TData, error: null } | { item: null, error: string } {
        const item = localStorage.getItem(key)

        if (item) {
            if (this.isJson(item)) {
                const parsedData: object = JSON.parse(item)

                // return an object
                return { item: parsedData, error: null }
            }

            if (this.isNumber(item)) {
                const parsedData = Number(item)

                return { item: parsedData, error: null }
            }

            // if item is a string, return it raw
            return { item, error: null }
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

}
