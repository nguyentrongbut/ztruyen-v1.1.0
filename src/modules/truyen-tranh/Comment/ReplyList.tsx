'use client'

import { useState } from "react";
import { IComment } from "@/types/api";
import { CommentService } from "@/services/api/comment";
import useGetMethod from "@/hooks/common/useGetMethod";
import ReplyItem from "@/modules/truyen-tranh/Comment/ReplyItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPaginationPages } from "@/utils/pagination";

type TReplyList = {
    commentId: string;
    show: boolean;
}

const REPLY_LIMIT = 2;

const ReplyList = ({ commentId, show }: TReplyList) => {
    const [page, setPage] = useState(1);

    const { data, isValidating } = useGetMethod<IModelPaginate<IComment>>({
        api: () => CommentService.listReplies(commentId, { page, limit: REPLY_LIMIT }),
        key: [`replies-${commentId}`, page.toString()],
        enabled: show,
        keepPreviousData: true,
    });

    const replies = data?.result ?? [];
    const totalPages = data?.meta?.totalPages ?? 1;

    return (
        <div className={cn('mt-4', !show && 'hidden')}>
            <ul className={cn('flex flex-col gap-y-5', isValidating && 'opacity-50 pointer-events-none')}>
                {replies.map((reply) => (
                    <ReplyItem key={reply._id} reply={reply} />
                ))}
            </ul>

            {totalPages > 1 && (
                <div className='flex items-center gap-1 mt-4 text-sm text-[#9499A0]'>
                    <span className='mr-3'>
                        {isValidating ? 'Đang tải...' : `Tổng ${totalPages} trang`}
                    </span>

                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 1 || isValidating}
                        className={cn(
                            'hover:text-primary',
                            (page === 1 || isValidating) && 'opacity-50 pointer-events-none'
                        )}
                    >
                        <ChevronLeft className='size-4' />
                    </button>

                    {getPaginationPages(page, totalPages).map((p, index) =>
                        p === '...' ? (
                            <span key={`ellipsis-${index}`}>...</span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => setPage(p as number)}
                                disabled={isValidating}
                                className={cn(
                                    'w-7 h-7 rounded text-xs',
                                    page === p ? 'bg-primary text-white' : 'hover:text-primary',
                                    isValidating && 'pointer-events-none'
                                )}
                            >
                                {p}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages || isValidating}
                        className={cn(
                            'hover:text-primary',
                            (page === totalPages || isValidating) && 'opacity-50 pointer-events-none'
                        )}
                    >
                        <ChevronRight className='size-4' />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReplyList;