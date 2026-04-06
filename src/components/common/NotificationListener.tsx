'use client'

import {useEffect} from 'react';
import {onMessage, getFirebaseMessaging} from '@/lib/firebase';
import toast from 'react-hot-toast';
import {useAuth} from '@/hooks/common/useAuth';
import {MessageCircle, Info, X, ThumbsUp} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

type NotifType = 'REPLY_COMMENT' | 'LIKE_COMMENT' | 'system';

const BADGE: Record<NotifType, { bg: string; icon: React.ReactNode }> = {
    REPLY_COMMENT: {
        bg: '#f4a400',
        icon: <MessageCircle className="size-2.5 text-white fill-white"/>,
    },
    LIKE_COMMENT: {
        bg: '#32aaff',
        icon: <ThumbsUp className="size-2.5 text-white fill-white"/>,
    },
    system: {
        bg: '#888888',
        icon: <Info className="size-2.5 text-white"/>,
    },
};

const AVATAR_PALETTE = [
    {bg: '#e7f3ff', color: '#1877F2'},
    {bg: '#fff0f0', color: '#e41e3f'},
    {bg: '#f0fff4', color: '#2d9e5f'},
    {bg: '#fff8e1', color: '#f4a400'},
    {bg: '#f3e8ff', color: '#7c3aed'},
];

function getInitials(name: string): string {
    return name
        .trim()
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function getAvatarStyle(name: string): { bg: string; color: string } {
    return AVATAR_PALETTE[name.charCodeAt(0) % AVATAR_PALETTE.length];
}

export interface INotificationFCM {
    type: NotifType;
    senderName: string;
    senderAvatar?: string;
    targetUrl?: string;
    comicSlug: string
    replyId: string;
    chapterId: string;
    commentId: string;
}

const NotificationListener = () => {
    const {isLogin} = useAuth();

    useEffect(() => {
        if (!isLogin) return;

        const messaging = getFirebaseMessaging();
        if (!messaging) return;

        const unsubscribe = onMessage(messaging, (payload) => {
            console.log('payload', payload);

            const title = payload.notification?.title || '';
            const body = payload.notification?.body || '';
            const data = (payload.data ?? {}) as Partial<INotificationFCM>;
            const avatarUrl = data.senderAvatar ?? '';
            const type: NotifType = data.type ?? 'system';
            const senderName = data.senderName ?? '';
            const targetUrl = data.targetUrl ?? '';

            const badge = BADGE[type];
            const avatar = getAvatarStyle(senderName);
            const initials = getInitials(senderName);

            toast.custom(
                (t) => (
                    <div
                        onClick={() => {
                            toast.dismiss(t.id);
                            if (targetUrl) window.location.href = targetUrl;
                        }}
                        className={[
                            'relative w-full sm:w-[380px]',
                            'px-3.5 sm:px-4 py-3.5 pr-10',
                            'bg-white dark:bg-zinc-900',
                            'border border-zinc-200 dark:border-zinc-700',
                            'rounded-2xl shadow-sm',
                            'cursor-pointer select-none',
                            t.visible ? 'animate-enter' : 'animate-leave',
                        ].join(' ')}
                    >
                        {/* Header */}
                        <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-3">
                            Thông báo mới
                        </p>

                        {/* Body */}
                        <div className="flex gap-3 items-start">
                            {/* Avatar + badge */}
                            <div className="relative flex-shrink-0">
                                <Avatar className="size-10 sm:size-12">
                                    <AvatarImage src={avatarUrl} alt={initials}/>
                                    <AvatarFallback
                                        style={{background: avatar.bg, color: avatar.color}}
                                        className="text-sm font-semibold"
                                    >
                                        {initials}
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
                                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-4 pl-2.5 border-l-2 border-zinc-300 dark:border-zinc-600">
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
                            className="absolute top-2.5 right-2.5 size-5 sm:size-[22px] flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <X className="size-3 text-zinc-500"/>
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