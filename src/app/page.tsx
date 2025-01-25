'use client'

export default function Home() {
    return (
        <div className="flex items-center justify-center h-full w-full">

        <ul className="grid grid-cols-4 w-full max-w-4xl h-60 gap-3">
            <li className="bg-ext_light_background rounded-md"></li>
            <li className="bg-ext_yellow rounded-md"></li>
            <li className="bg-ext_indigo rounded-md"></li>
            <li className="bg-ext_green rounded-md"></li>
            <li className="bg-ext_foreground rounded-md"></li>
            <li className="bg-ext_light_foreground rounded-md"></li>
            <li className="border border-ext_light_foreground rounded-md"></li>
            <li className="bg-ext_red rounded-md"></li>
            <li className="bg-ext_blue rounded-md"></li>
            <li className="bg-ext_orange rounded-md"></li>
        </ul>
        </div>
    );
}
