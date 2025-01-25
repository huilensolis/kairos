'use client'

export default function Home() {
    return (
        <div className="w-full h-full grid grid-cols-4">
            <aside className="col-span-1"> time blocks templates</aside>
            <main className="col-span-2 border-x border-ext_light_foreground flex justify-center">
                <ul className="flex flex-col gap-2 w-full px-2 py-2 max-w-2xl">
                    <li className="bg-ext_yellow rounded-sm h-24 w-full"></li>
                    <li className="bg-ext_indigo rounded-sm h-24 w-full"></li>
                    <li className="bg-ext_green rounded-sm h-24 w-full"></li>
                    <li className="bg-ext_red rounded-sm h-24 w-full border-2 border-ext_light_foreground"></li>
                    <li className="bg-ext_orange rounded-sm h-24 w-full border-2 border-ext_light_foreground"></li>
                    <li className="bg-ext_blue rounded-sm h-24 w-full border-2 border-ext_light_foreground"></li>
                </ul>
            </main>
            <aside className="col-span-1"> music info</aside>
        </div>
    );
}
