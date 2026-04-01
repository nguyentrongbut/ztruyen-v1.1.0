'use client'

// ** React
import {useState} from "react";

// ** Types
import {IComment, IUserProfile} from "@/types/api";

// ** Module
import CommentItem from "@/modules/truyen-tranh/Comment/CommentItem";

type TListComment = {
    listComment: IComment[];
    comicSlug: string;
    comicName: string;
    mutate: () => Promise<unknown>;
    profile?: IUserProfile
    detailKey?: string
    type: "detail" | "reading";
}

const ListComment = ({
                         listComment, comicName, comicSlug, mutate, profile,
                         detailKey, type
}: TListComment) => {
    const [activeCommentId, setActiveCommentId] = useState<string | null>(null);

    return (
        <ul className='flex flex-col gap-y-5 mt-10'>
            {listComment.map((comment) => (
                <CommentItem
                    key={comment._id}
                    user={comment.userId}
                    comment={comment}
                    comicName={comicName}
                    comicSlug={comicSlug}
                    mutate={mutate}
                    activeCommentId={activeCommentId}
                    onSetActiveCommentId={setActiveCommentId}
                    profile={profile}
                    detailKey={detailKey}
                    type={type}
                />
            ))}
        </ul>
    )
}

export default ListComment;