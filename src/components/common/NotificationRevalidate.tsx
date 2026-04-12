'use client'

// ** React
import {useEffect} from 'react'

// ** SWR
import {mutate} from 'swr'

// ** Config
import {CONFIG_TAG} from "@/configs/tag";

const NotificationRevalidate = () => {
    useEffect(() => {
        const channel = new BroadcastChannel('notification-click')

        channel.onmessage = (event) => {
            if (event.data?.type === 'REVALIDATE') {
                void mutate(CONFIG_TAG.NOTIFICATION.COUNT)
                void mutate(CONFIG_TAG.NOTIFICATION.LIST)
            }
        }

        return () => channel.close()
    }, [])

    return null
}

export default NotificationRevalidate