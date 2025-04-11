import { useEffect } from "react";
import { TimeBlock } from "@/app/modules/time-blocking/time-blocking.model";
import { useTimeBlock } from "@/app/modules/time-blocking/time-blocking.hook";

export function Timeblock({ id }: { id: TimeBlock['id'] }) {
    const { timeBlock, updateTimeBlock } = useTimeBlock({ id })

    if (!timeBlock) return <article><h1> not found</h1></article>

    useEffect(() => {
        if (timeBlock.status === 'playing') {
            const timeInterval = setInterval(() => {
                updateTimeBlock({ elapsedTime: timeBlock.elapsedTime + 1 })
            }, 1000)

            return () => {
                clearInterval(timeInterval)
            }
        }
    }, [timeBlock.status])

    const { color } = timeBlock

    return (
        <article className={`${color === 'blue' ? 'bg-ext_blue' : color === 'orange' ? 'bg-ext_orange' : color === 'red' ? 'bg-ext_red' : color === 'green' ? 'bg-ext_green' : color === 'indigo' ? 'bg-ext_indigo' : 'bg-gray-500'} w-full rounded-sm p-2`}>
            <h1>{timeBlock.title}</h1>
            <p>{timeBlock.duration}</p>
            {timeBlock.status === 'pause' || timeBlock.status === 'playing' && (
                <button onClick={() => {
                    updateTimeBlock({ status: timeBlock.status === 'playing' ? 'pause' : 'playing' })
                }}>{timeBlock.status === 'playing' ? 'stop' : 'play'}</button>
            )}
        </article>
    )
}
