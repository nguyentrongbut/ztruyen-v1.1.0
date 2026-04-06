'use client'

// ** React
import { useEffect } from 'react'

// ** Hook
import { useAuth } from '@/hooks/common/useAuth'

// ** Lib
import {getSavedFcmToken, initFCM} from '@/lib/fcm'

export function useFCMInit() {
    const { isLogin } = useAuth()

    useEffect(() => {
        if (!isLogin) return

        if (getSavedFcmToken()) return

        const timer = setTimeout(() => {
            initFCM().catch(console.error)
        }, 2000)
        return () => clearTimeout(timer)
    }, [isLogin])
}