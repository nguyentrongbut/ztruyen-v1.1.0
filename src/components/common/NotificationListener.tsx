'use client'

// ** React
import {useEffect} from 'react';

// ** Lib
import {onMessage, getFirebaseMessaging} from '@/lib/fcm/firebase';

// ** React hot toast
import toast from 'react-hot-toast';

// ** Hook
import {useAuth} from '@/hooks/common/useAuth';

// ** Icons
import {X} from 'lucide-react';

// ** Component
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

// ** Lib
import {dispatchRefresh} from "@/lib/invalidate-cache/events";
import {cn} from "@/lib/utils";

// ** Type
import {INotificationFCM, NotificationType} from "@/types/api";
import {fallbackAvatar} from "@/components/common/AvatarWithFrame";
import {getBadgeNotification} from "@/utils/getBadgeNotification";

export type NotificationFCMType = NotificationType | 'system';

const NotificationListener = () => {
    const {isLogin} = useAuth();

    useEffect(() => {
        if (!isLogin) return;

        const messaging = getFirebaseMessaging();
        if (!messaging) return;

        const unsubscribe = onMessage(messaging, (payload) => {
            const data = (payload.data ?? {}) as Partial<INotificationFCM>;

            const title = payload.notification?.title || '';
            const body = payload.notification?.body || '';
            const avatarUrl = data.senderAvatar ?? '';
            const type: NotificationFCMType = data.type ?? 'system';
            const senderName = data.senderName ?? '';
            const targetUrl = data.targetUrl ?? '';

            const badge = getBadgeNotification[type];

            if (type === 'REPLY_COMMENT' || type === 'LIKE_COMMENT') {
                dispatchRefresh()
            }

            toast.custom(
                (t) => (
                    <div
                        onClick={() => {
                            toast.dismiss(t.id);
                            if (targetUrl) window.location.href = targetUrl;
                        }}
                        className={cn('notification-wrapper',  t.visible ? 'animate-enter' : 'animate-leave')}
                    >
                        {/* Header */}
                        <p className="notification-header">
                            Thông báo mới
                        </p>

                        {/* Body */}
                        <div className="notification-body">
                            {/* Avatar + badge */}
                            <div className="relative flex-shrink-0">
                                <Avatar className="size-10 sm:size-12">
                                    <AvatarImage src={avatarUrl} alt={senderName}/>
                                    <AvatarFallback asChild>
                                        <div className="relative size-full">{fallbackAvatar}</div>
                                    </AvatarFallback>
                                </Avatar>
                                {/* Badge */}
                                <div
                                    className="absolute -bottom-1 -right-1 size-5 sm:size-[22px] rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center"
                                    style={{background: badge.bg}}
                                >
                                    {badge.icon}
                                </div>
                            </div>

                            {/* Text */}
                            <div className="flex-1 min-w-0 space-y-1.5">

                                <p className="text-[13px] leading-snug">
                                     <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-1">
                                        {senderName}
                                    </span>
                                    <span className="text-zinc-500 dark:text-zinc-400">
                                        {title}
                                    </span>
                                </p>
                                {body && (
                                    <p className="notification-desc line-clamp-4 pl-2.5 border-l-2 border-zinc-300 dark:border-zinc-600">
                                        {body}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toast.dismiss(t.id);
                            }}
                            className="notification-close"
                        >
                            <X/>
                        </button>
                    </div>
                ),
                {
                    duration: 5000,
                    position: 'top-right',
                }
            );
        });

        return () => unsubscribe();
    }, [isLogin]);

    return null;
};

export default NotificationListener;