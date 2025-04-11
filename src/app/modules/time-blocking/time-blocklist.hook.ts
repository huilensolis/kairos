'use client'


import { useEffect, useState } from "react";
import { TimeBlock } from "./time-blocking.model";
import { StorageModel } from "../storage/storage";
type TTimeblockListItem = {
    id: TimeBlock['id']
}

const timeBlockListKey = 'timeblocklist'

export function useTimeBlockList() {
    const [timeBlockList, setTimeBlockList] = useState<TTimeblockListItem[]>(() => {
        const { timeBlockList } = getTimeBlockListFromStorage()

        return timeBlockList
    })

    useEffect(() => {
        StorageModel.subscribeToItemChanges(timeBlockListKey, ({ oldValue, newValue, url }) => {
            if (!newValue) {
                setTimeBlockList([])
                return
            }

            setTimeBlockList(newValue as unknown as TTimeblockListItem[])
        })
    }, [])

    useEffect(() => {
        const { error: doesTimeBlockListItemExistInStorage } = StorageModel.getItem({ key: timeBlockListKey })
        if (doesTimeBlockListItemExistInStorage) {
            StorageModel.saveItem({ key: timeBlockListKey, data: timeBlockList })
            return
        }

        StorageModel.updateItem({ key: timeBlockListKey, data: timeBlockList })
    }, [timeBlockList])

    function getTimeBlockListFromStorage(): { timeBlockList: TTimeblockListItem[] } {
        const { item: timeBlockList, error } = StorageModel.getItem<TTimeblockListItem[]>({ key: timeBlockListKey })

        if (!timeBlockList || error) return { timeBlockList: [] }

        return { timeBlockList }
    }

    function pushListItem({ timeblock }: { timeblock: TTimeblockListItem }) { setTimeBlockList([...timeBlockList, timeblock]) } return { timeBlockList, pushListItem }
}
