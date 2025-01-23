'use client'

export class WebPushNotification {
    constructor() {
        //
    }

    static AreNotificationsSupported(): boolean {
        return "Notification" in window
    }

    /**
    * @returns
    * "default" means that the user wasnt been asked for permission yet
    * "granted" means that the user has accepted to receive notifications
    * "denied" means that the user has been asked to receive notifications and he denied. in this case, asking for permission again wont make the browser ask again. the user must turn them on manually.
    */
    static getPermissionStatus() {
        return Notification.permission
    }

    static async askForPermission(): Promise<{ success: boolean }> {

        const result = await Notification.requestPermission()

        if (result === 'granted') return { success: true }

        return { success: false }
    }

    public static sendNotification({ title, options }: {
        title: string
        , options: NotificationOptions
    }): Notification {
        if (!this.AreNotificationsSupported()) throw new Error("Notifications are not supported")

        if (this.getPermissionStatus() !== 'granted') throw new Error('User has not accepted push notifications yet')

        return new Notification(title, options)
    }
}
