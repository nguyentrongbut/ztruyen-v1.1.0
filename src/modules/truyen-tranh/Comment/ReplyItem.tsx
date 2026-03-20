'use client'

import AvatarWithFrame from "@/components/common/AvatarWithFrame";
import { IComment } from "@/types/api";
import { ThumbsUp } from "lucide-react";
import dayjs from "dayjs";

type TReplyItem = {
    reply: IComment;
    isReplyOpen: boolean;
    onToggleReply: () => void;
}

const ReplyItem = ({ reply, isReplyOpen, onToggleReply }: TReplyItem) => {
    return (
        <li>
            <div className='flex items-start'>
                <div className='mr-2'>
                    <AvatarWithFrame
                        size={60}
                        avatarName={reply.userId.name}
                        avatarUrl={reply.userId.avatar?.url}
                        frameName={reply.userId.avatar_frame?.name}
                        frameUrl={reply.userId.avatar_frame?.image?.url}
                    />
                </div>
                <div className='text-[#61666D] mt-3 text-[15px] truncate dark:text-gray-300'>
                    {reply.userId.name}
                </div>
            </div>
            <div className='ml-[68px]'>
                <div className='-mt-6 dark:text-gray-200'>
                    {reply.replyTo && (
                        <span className='text-primary mr-1.5'>@{reply.replyTo.name}</span>
                    )}
                    {reply.content}
                </div>
                <div className='flex gap-5 text-sm mt-1 text-[#9499A0] dark:text-gray-400'>
                    <div>{dayjs(reply.createdAt).format("DD-MM-YYYY HH:mm")}</div>
                    <div className='flex gap-1 items-center hover:text-primary cursor-pointer'>
                        <ThumbsUp className='size-3.5' />
                        {reply.likeCount > 0 && <span>{reply.likeCount}</span>}
                    </div>
                    <span
                        onClick={onToggleReply}
                        className='cursor-pointer hover:text-primary'
                    >
                        {isReplyOpen ? 'Huỷ' : 'Phản hồi'}
                    </span>
                </div>
            </div>
        </li>
    );
};

export default ReplyItem;