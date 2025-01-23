'use client'

import { WebPushNotification } from "@/pwa/models/web-push-notifications";

export default function Home() {
    async function sendNotification() {

        const permissions = WebPushNotification.getPermissionStatus()

        if (permissions !== 'granted') {
            const { success } = await WebPushNotification.askForPermission()

            if (!success) return
        }

        WebPushNotification.sendNotification(
            { title: "Kairos", options: { body: "test notification", icon: '/favicon_io/android-chrome-512x512.png' } })
    }

    return (
        <div className="min-h-screen h-full w-full flex items-center justify-center">
            <button
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-neutral-100 text-neutral-950 gap-2 hover:brightness-90 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                onClick={sendNotification}
            >
                send notification
            </button>
        </div>
    );
}
