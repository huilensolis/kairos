'use client'

import { useTimeBlockList } from "@/app/modules/time-blocking/time-blocklist.hook"
import { Timeblock } from "./timeblock.component"
import { useEffect } from "react"

export function TimeBlockList() {
    const { timeBlockList } = useTimeBlockList()

    useEffect(() => {
        console.log('state changed')
    }, [timeBlockList])

    return (
        <ul className='w-full flex flex-col-reverse gap-2 p-2'>
            {timeBlockList.map((timeblock, index) =>
                <li key={index}>
                    <Timeblock id={timeblock.id} />
                </li>
            )}
        </ul>
    )
}
