'use client'


import { useState } from "react";
import { TimeBlock } from "./time-blocking";
import { StorageModel } from "../storage/storage";
type TTimeblockListItem = {
    id: TimeBlock['id']
}

const timeBlockListKey = 'timeblocklist'

export function useTimeBlockList() {
    const [timeBlockList, setTimeBlockList] = useState<TTimeblockListItem[]>(() => {
        //generateTimeBlocks()
        const { timeBlockList } = getTimeBlockList()

        return timeBlockList
    })

    function getTimeBlockList(): { timeBlockList: TTimeblockListItem[] } {
        const { item: timeBlockList, error } = StorageModel.getItem<TTimeblockListItem[]>({ key: timeBlockListKey })

        if (!timeBlockList || error) return { timeBlockList: [] }

        return { timeBlockList }
    }

    function generateTimeBlocks() {
        const localTimeBlockList = [
            new TimeBlock({
                timeBlock: { id: crypto.randomUUID(), index: 1, status: 'pause', title: 'test', elapsedTime: 0, duration: 1100000, createdAt: new Date(), color: 'red' }, onUpdate: (timeblock) => {
                    //
                }
            })
        ]

        localTimeBlockList.forEach((timeblock) => {
            StorageModel.saveItem({ key: timeblock.id, data: timeblock })
        })

        const blocklist = localTimeBlockList.map((item) => {
            return { id: item.id }
        })

        StorageModel.saveItem({
            key: timeBlockListKey, data: blocklist
        })
    }

    return { timeBlockList }
}
