'use client'

import {useState} from "react";
import {Separator} from "@/components/ui/separator";
import AvatarWithFrame from "@/components/common/AvatarWithFrame";
import {IComment, IUserComment} from "@/types/api";
import {ThumbsUp, ChevronDown, ChevronUp} from "lucide-react";
import dayjs from "dayjs";
import ReplyList from "@/modules/truyen-tranh/Comment/ReplyList";

type TCommentItem = {
    user: IUserComment;
    comment: IComment;
}

const CommentItem = ({user, comment}: TCommentItem) => {
    const [showReplies, setShowReplies] = useState(false);

    const handleToggle = () => setShowReplies(prev => !prev);

    return (
        <li>
            <div className='flex items-start'>
                <div className='mx-2'>
                    <AvatarWithFrame
                        size={60}
                        avatarName={user.name}
                        avatarUrl={user.avatar?.url}
                        frameName={user.avatar_frame?.name}
                        frameUrl={user.avatar_frame?.image?.url}
                    />
                </div>
                <div className='text-[#61666D] mt-3 text-[15px] truncate dark:text-gray-300'>
                    {user.name}
                </div>
            </div>

            <div className='ml-[76px]'>
                <div className='-mt-6 dark:text-gray-200'>
                    {comment.content}
                </div>

                <div className='flex gap-5 text-sm mt-1 text-[#9499A0] dark:text-gray-400'>
                    <div>{dayjs(comment.createdAt).format("DD-MM-YYYY HH:mm")}</div>
                    <div className='flex gap-1 items-center hover:text-primary cursor-pointer'>
                        <ThumbsUp className='size-3.5'/>
                        {comment.likeCount > 0 && <span>{comment.likeCount}</span>}
                    </div>
                    <span className='cursor-pointer hover:text-primary'>Phản hồi</span>
                </div>

                {comment.replyCount > 0 && (
                    <button
                        onClick={handleToggle}
                        className='flex items-center gap-1 text-sm text-primary mt-2 hover:underline'
                    >
                        {showReplies
                            ? <><ChevronUp className='size-4'/> Thu gọn</>
                            : <><ChevronDown className='size-4'/> {comment.replyCount} phản hồi</>
                        }
                    </button>
                )}

                <ReplyList commentId={comment._id} show={showReplies}/>

                <Separator className='bg-[#E3E5E7] dark:bg-zinc-700 mt-6'/>
            </div>
        </li>
    );
};

export default CommentItem;