'use client'

// ** React
import { useEffect } from 'react'

// ** Hook
import { useAuth } from '@/hooks/common/useAuth'

// ** Lib
import {initFCM} from '@/lib/fcm/fcm'

// ** Utils
import {isIOSSafariBrowser} from "@/utils/platform";

export function useFCMInit() {
    const { isLogin } = useAuth()

    useEffect(() => {
        if (!isLogin) return

        if (isIOSSafariBrowser()) return

        if (Notification.permission === 'granted') {
            initFCM().catch(console.warn)
        }
    }, [isLogin])
}