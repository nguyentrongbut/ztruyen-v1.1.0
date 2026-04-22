'use client'

// ** React
import { useEffect, useRef, useState } from 'react'

// ** React hot toast
import toast from 'react-hot-toast'

// ** Icons
import { Bell, X, Loader2 } from 'lucide-react'

// ** Lib
import { requestNotificationPermission, initFCM } from '@/lib/fcm/fcm'
import { cn } from '@/lib/utils'

// ** Util
import {isIOSSafariBrowser} from "@/utils/platform";

const TOAST_ID = 'fcm-notification-prompt'
const AUTO_DISMISS_MS = 8000

export function askEnableNotification() {
    if (typeof window === 'undefined') return
    if (Notification.permission === 'granted') return
    if (localStorage.getItem('fcm_asked')) return

    if (isIOSSafariBrowser()) return

    localStorage.setItem('fcm_asked', 'true')

    toast.custom(
        (t) => <NotificationToast t={t} />,
        { id: TOAST_ID, duration: Infinity, position: 'top-right' }
    )
}

interface NotificationToastProps {
    t: { id: string; visible: boolean }
}

function NotificationToast({ t }: NotificationToastProps) {
    const [loading, setLoading] = useState(false)
    const interactedRef = useRef(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!interactedRef.current) {
                toast.dismiss(t.id)
            }
        }, AUTO_DISMISS_MS)

        return () => clearTimeout(timer)
    }, [t.id])

    const handleEnable = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (loading) return

        interactedRef.current = true
        setLoading(true)

        try {
            const granted = await requestNotificationPermission()

            if (granted) {
                await initFCM()
                toast.success('Đã bật thông báo')
            } else {
                toast.error('Bạn đã từ chối. Hãy bật lại trong cài đặt chung.')
            }
        } catch {
            toast.error('Có lỗi xảy ra, thử lại sau')
        } finally {
            setLoading(false)
            toast.dismiss(t.id)
        }
    }

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation()
        toast.dismiss(t.id)
    }

    return (
        <div
            className={cn(
                'notification-wrapper',
                t.visible ? 'animate-enter' : 'animate-leave'
            )}
        >
            <p className="notification-header">Thông báo</p>

            <div className="notification-body">
                <div className="relative flex-shrink-0">
                    <div className="size-10 sm:size-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Bell className="size-5 text-amber-500 dark:text-amber-400" />
                    </div>
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                        Bật thông báo
                    </p>

                    <p className="notification-desc">
                        Nhận thông báo khi có người phản hồi hoặc thích bình luận
                    </p>

                    <button
                        onClick={handleEnable}
                        disabled={loading}
                        className={cn(
                            'mt-1 px-3 py-1.5 text-xs font-medium rounded-lg w-full flex items-center justify-center gap-2',
                            'bg-primary text-white transition',
                            loading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-80'
                        )}
                    >
                        {loading && <Loader2 className="size-3 animate-spin" />}
                        {loading ? 'Chờ tý nhé ~~' : 'Bật ngay'}
                    </button>
                </div>
            </div>

            <button
                onClick={handleDismiss}
                className="notification-close"
                disabled={loading}
            >
                <X />
            </button>
        </div>
    )
}