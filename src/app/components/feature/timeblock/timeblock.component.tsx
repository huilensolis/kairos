import { TimeBlock } from "@/app/modules/time-blocking/time-blocking";
import { useTimeBlock } from "@/app/modules/time-blocking/time-blocking.hook";

export function Timeblock({ id }: { id: TimeBlock['id'] }) {
    const { timeBlock, updateTimeBlock } = useTimeBlock({ id })

    if (!timeBlock) return <article><h1> not found</h1></article>

    return <article>
        <h1>{timeBlock.title}</h1>
        <p>{timeBlock.status}</p>
        <p>{timeBlock.duration}</p>
    </article>
}
