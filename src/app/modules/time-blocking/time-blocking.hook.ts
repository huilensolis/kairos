'use client'

import { useEffect, useState } from "react";
import { TimeBlock, type TTimeBlock } from "./time-blocking";
import { StorageModel } from "../storage/storage";

export function useTimeBlock({ id }: { id: TTimeBlock['id'] }) {
    const [timeBlock, setTimeBlock] = useState<TimeBlock | null>(() => {
        const { timeblock } = getTimeBlock({ id })

        return timeblock
    })

    function getTimeBlock({ id }: { id: TimeBlock['id'] }): { timeblock: TimeBlock | null } {
        const { item, error } = StorageModel.getItem<Omit<TimeBlock, 'onUpdate'>>({ key: id })

        if (!item || error) return { timeblock: null }

        const timeblock = new TimeBlock({
            timeBlock: item, onUpdate: (timeblock) => {
                //
            }
        })

        return { timeblock }
    }

    useEffect(() => {
        const { timeblock } = getTimeBlock({ id })

        setTimeBlock(timeblock)
    }, [])

    function updateTimeBlock({ ...updatedValues }: TTimeBlock) {
        if (!timeBlock) return

        timeBlock.updateTimeBlock(updatedValues)
    }

    return { timeBlock, updateTimeBlock }
}
