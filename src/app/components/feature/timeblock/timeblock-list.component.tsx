'use client'

import { useTimeBlockList } from "@/app/modules/time-blocking/time-blocklist.hook"
import { Timeblock } from "./timeblock.component"

export function TimeBlockList() {
    const { timeBlockList } = useTimeBlockList()

    return <ul>
        {timeBlockList.map((timeblock, index) =>
            <li>
                <Timeblock key={index} id={timeblock.id} />
            </li>
        )}
    </ul>
}
