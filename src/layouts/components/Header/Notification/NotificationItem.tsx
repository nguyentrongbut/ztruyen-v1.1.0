// ** Shadcn ui
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

// ** Util
import formatRelativeTime from "@/utils/formatRelativeTime";

// ** Lib
import {cn} from "@/lib/utils";

// ** Type
import {NotificationType} from "@/types/api";

// ** Component
import {fallbackAvatar} from "@/components/common/AvatarWithFrame";
import {getBadgeNotification} from "@/utils/getBadgeNotification";

type TNotificationItem = {
    senderName: string;
    senderAvatar: string;
    content: string;
    createdAt: string;
    isRead: boolean;
    comicName: string;
    type: NotificationType;
}

const NotificationItem = (
    {senderName, senderAvatar, content, comicName, isRead, createdAt, type}: TNotificationItem) => {

    const badge = getBadgeNotification[type];

    return (
        <div className='flex gap-3 items-start py-2'>
            <div className='relative flex-shrink-0'>
                <Avatar className='size-14'>
                    <AvatarImage src={senderAvatar} alt={senderName}/>
                    <AvatarFallback asChild>
                        <div className="relative size-full">{fallbackAvatar}</div>
                    </AvatarFallback>
                </Avatar>

                <div
                    className='absolute -bottom-1 -right-1 rounded-full size-6 bg-primary flex justify-center items-center'
                    style={{background: badge.bg}}
                >
                    {badge.icon}
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className={cn(isRead ? 'opacity-60' : '')}>
                    <p className='line-clamp-3'>
                        <span className='text-sm font-medium'>{senderName}</span>
                        {' '}
                        <span className='text-xs text-muted-foreground'>
                        {type === 'REPLY_COMMENT' ? 'đã phản hồi về ' : 'đã thích '}
                            bình luận của bạn tại truyện {' '}
                            <span className='text-primary'>{comicName}</span>

                        : {content}
                    </span>
                    </p>
                    <div
                        className={cn('text-xs mt-1', isRead ? '' : 'text-destructive dark:text-amber-400')}>
                        {formatRelativeTime(createdAt)}
                    </div>
                </div>
                {!isRead && <div className='rounded-full size-2 bg-primary flex-shrink-0 -mt-3'/>}
            </div>
        </div>
    )
}

export default NotificationItem