import { NewTimeBlock } from "./components/feature/timeblock/new-timeblock";
import { TimeBlockList } from "./components/feature/timeblock/timeblock-list.component";

export default function Home() {
    return (
        <div className="w-full h-full grid grid-cols-4">
            <aside className="col-span-1"> time blocks templates</aside>
            <main className="col-span-2 border-x border-ext_light_foreground flex flex-col">
                    <NewTimeBlock />
                    <TimeBlockList />
            </main>
            <aside className="col-span-1"> music info</aside>
        </div>
    );
}
