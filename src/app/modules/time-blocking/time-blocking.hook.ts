'use client'

import { useEffect, useRef, useState } from "react";
import { TimeBlock, type TTimeBlock } from "./time-blocking.model";
import { StorageModel } from "../storage/storage";

export function useTimeBlock({ id }: { id: TTimeBlock['id'] }) {
    const [timeBlock, setTimeBlock] = useState<TimeBlock | null>(() => {
        const { timeblock } = getTimeBlock({ id })

        return timeblock
    })

    const isFirstRender = useRef(false)

    function getTimeBlock({ id }: { id: TimeBlock['id'] }): { timeblock: TimeBlock | null } {
        const { item, error } = StorageModel.getItem<Omit<TimeBlock, 'onUpdate'>>({ key: id })

        if (!item || error) return { timeblock: null }

        const timeblock = new TimeBlock({
            timeBlock: item, onUpdate: (updatedTimeBlock) => {
                setTimeBlock(updatedTimeBlock)
            }
        })

        return { timeblock }
    }

    useEffect(() => {
        if (!timeBlock) return
        if (isFirstRender.current === true) {
            isFirstRender.current = false
            return
        }

        StorageModel.updateItem({ key: timeBlock.id, data: timeBlock })

    }, [timeBlock])

    //useEffect(() => {
    //    const { timeblock } = getTimeBlock({ id })
    //
    //    setTimeBlock(timeblock)
    //}, [])

    function updateTimeBlock({ ...updatedValues }: Partial<TTimeBlock>) {
        if (!timeBlock) return

        timeBlock.update(updatedValues)
    }

    return { timeBlock, updateTimeBlock }
}
