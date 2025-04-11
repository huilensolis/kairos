import { randomUUID } from "crypto";

type TColor = 'blue' | 'orange' | 'red' | 'green' | 'indigo'
type TStatus = 'pause' | 'playing' | 'completed'

export interface TTimeBlock {
    id: string;
    title: string;
    color: TColor;
    status: TStatus
    duration: number; // miliseconds
    elapsedTime: number
    createdAt: Date;
}

interface TimeBlockInterface {
    id: string;
    title: string;
    color: TColor;
    status: TStatus
    duration: number; // miliseconds
    elapsedTime: number
    createdAt: Date;

    onUpdate: (timeblock: TTimeBlock) => void
}


export class TimeBlock implements TimeBlockInterface {
    public id: string;
    public title: string;
    public color: TColor;
    public status: TStatus
    public duration: number; // miliseconds
    public elapsedTime: number
    public createdAt: Date;

    onUpdate: (timeblock: TTimeBlock) => void;

    constructor({ timeBlock, onUpdate }:
        { timeBlock: TTimeBlock, onUpdate: (timeblock: TTimeBlock) => void }) {

        const { id = randomUUID(), title, color = 'blue', status = 'pause', duration, elapsedTime = 0, createdAt = new Date()} = timeBlock

        this.id = id
        this.title = title
        this.color = color
        this.status = status
        this.duration = duration
        this.elapsedTime = elapsedTime
        this.createdAt = createdAt

        this.onUpdate = onUpdate
    }

    removeTImeBlock() {
        //
    }

    updateTimeBlock({ ...newData }: Partial<Omit<TTimeBlock, 'id'>>) {
        for (const key of Object.keys(newData) as Array<keyof typeof newData>) {
            if (key in this) {
                (this as any)[key] = newData[key]!
            }
        }


        this.onUpdate(this)
    }
}
