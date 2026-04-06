'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, X } from "lucide-react";

const data = {
    senderName: 'Nguyễn Văn A',
    senderAvatar: 'https://i.pravatar.cc/100?img=12',
    content: 'đã phản hồi bình luận của bạn',
    comicName: 'One Piece',
    contentPreview: 'hay vãi',
};

function getInitials(name: string): string {
    return name
        .trim()
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

const UiTestPage = () => {
    const t = { id: 'test', visible: true };

    return (
        <div className="p-4 sm:p-10 min-h-screen">
            <div
                className={[
                    'relative w-full sm:w-[380px]',
                    'p-4 pr-10',
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

                <div className="flex gap-3 items-start">
                    {/* Avatar + badge */}
                    <div className="relative flex-shrink-0">
                        <Avatar className="size-10 sm:size-11">
                            <AvatarImage src={data.senderAvatar} alt={data.senderName} />
                            <AvatarFallback className="text-sm font-semibold">
                                {getInitials(data.senderName)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 size-[18px] rounded-full bg-primary border-2 border-white dark:border-zinc-900 flex items-center justify-center">
                            <MessageCircle className="size-2 text-white fill-white" />
                        </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                        {/* Action line */}
                        <p className="text-[13px] leading-snug">
                            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {data.senderName}
                            </span>
                            <span className="text-zinc-500 dark:text-zinc-400">
                                {' '}{data.content} tại{' '}
                            </span>
                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                {data.comicName}
                            </span>
                        </p>

                        {/* Comment preview */}
                        {data.contentPreview && (
                            <p className="text-[12px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-4 pl-2.5 border-l-2 border-zinc-300 dark:border-zinc-600">
                                {data.contentPreview}
                            </p>
                        )}
                    </div>
                </div>

                {/* Close button */}
                <button className="absolute top-3 right-3 size-[22px] flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors">
                    <X className="size-3 text-zinc-400" />
                </button>
            </div>
        </div>
    );
};

export default UiTestPage;