'use client'

import { StorageModel } from "@/app/modules/storage/storage"
import { TimeBlock } from "@/app/modules/time-blocking/time-blocking.model"
import { useTimeBlockList } from "@/app/modules/time-blocking/time-blocklist.hook"

export function NewTimeBlock() {
    const { timeBlockList, pushListItem } = useTimeBlockList()

    function onNewTimeBlock() {
        const timeblock = new TimeBlock(
            {
                timeBlock: {
                    status: 'pause',
                    elapsedTime: 0,
                    id: crypto.randomUUID(),
                    color: 'indigo',
                    createdAt: new Date(),
                    duration: 347,
                    title: 'test time block'
                },
                onUpdate: () => { }
            },
        )

        StorageModel.saveItem({ key: timeblock.id, data: timeblock })

        pushListItem({ timeblock: { id: timeblock.id } })
    }

    return <button onClick={onNewTimeBlock}>new test timeblock</button>
}
