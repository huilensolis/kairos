'use client'


import { useEffect, useRef, useState } from "react";
import { TimeBlock } from "./time-blocking.model";
import { StorageModel } from "../storage/storage";


type TTimeblockListItem = {
    id: TimeBlock['id']
}

const TIME_BLOCK_LIST_KEY = 'timeblocklist'

const TIME_BLOCK_LIST_CHANGE_EVENT_NAME = 'timeblocklist-change'

export function useTimeBlockList() {
    const isInitializedRef = useRef(false);
    const [ isStateSyncWithStorage, setIsStateSyncWithStorage] = useState(false) 

    const [timeBlockList, setTimeBlockList] = useState<TTimeblockListItem[]>([])

    useEffect(() => {
        const { timeBlockList } = getTimeBlockListFromStorage()

        setTimeBlockList(timeBlockList)

        setIsStateSyncWithStorage(true)
    }, [])

    function ensureTimeBlockListExistsInStorage() {
        // ensure timeblocklist exists in storage
        const { error: doesntTimeBlockListItemExistInStorage } = StorageModel.getItem({ key: TIME_BLOCK_LIST_KEY })
        if (doesntTimeBlockListItemExistInStorage) {
            StorageModel.saveItem({ key: TIME_BLOCK_LIST_KEY, data: timeBlockList })
        }

    }

    // listen to time block list change event
    useEffect(() => {
        if (isInitializedRef.current) return
        isInitializedRef.current = true

        ensureTimeBlockListExistsInStorage()

        function syncTimeBlockListStateWithStorage() {

            const { timeBlockList: updatedTimeBlockList } = getTimeBlockListFromStorage()


            setTimeBlockList((prev) => {
                if (prev.length !== updatedTimeBlockList.length) {
                    return [...updatedTimeBlockList]
                }

                return prev
            })
        }

        // listen to current tab timeblocklist changes
        window.addEventListener(TIME_BLOCK_LIST_CHANGE_EVENT_NAME, syncTimeBlockListStateWithStorage)

        // sync through multiple tabs
        // listen to another tab changes in storage
        StorageModel.subscribeToItemChanges(TIME_BLOCK_LIST_KEY, ({ newValue }) => {
            if (!newValue) {
                setTimeBlockList([])
                return
            }

            setTimeBlockList([...newValue as unknown as TTimeblockListItem[]])
        })

        return () => {
            window.removeEventListener(TIME_BLOCK_LIST_CHANGE_EVENT_NAME, syncTimeBlockListStateWithStorage)
        }
    }, [])

    // function must be called every time timeBlockList changes
    function afterChange() {
        // trigger time block list change event
        window.dispatchEvent(new Event(TIME_BLOCK_LIST_CHANGE_EVENT_NAME))
    }


    useEffect(() => {
        if(!isStateSyncWithStorage) return
        console.log('running')

        const { timeBlockList: timeBlockListFromStorage } = getTimeBlockListFromStorage()

        if (timeBlockListFromStorage.length !== timeBlockList.length) {
            StorageModel.updateItem({ key: TIME_BLOCK_LIST_KEY, data: timeBlockList })
            afterChange()
        }


    }, [timeBlockList])

    function getTimeBlockListFromStorage(): { timeBlockList: TTimeblockListItem[] } {
        const { item: timeBlockList, error } = StorageModel.getItem<TTimeblockListItem[]>({ key: TIME_BLOCK_LIST_KEY })

        if (!timeBlockList || error) return { timeBlockList: [] }

        return { timeBlockList }
    }

    function pushListItem({ timeblock }: { timeblock: TTimeblockListItem }) {
        setTimeBlockList([...timeBlockList, timeblock])
    }

    return { timeBlockList, pushListItem }
}
