'use client'

// ** Type
import {IComment} from "@/types/api";

// ** Module
import CommentItem from "@/modules/truyen-tranh/Comment/CommentItem";

type TListComment = {
    listComment: IComment[];
}

const ListComment = ({listComment}: TListComment) => {


    return (
        <ul className='flex flex-col gap-y-5 mt-10'>
            {listComment.map((comment) => (
                <CommentItem
                    key={comment._id}
                    user={comment.userId}
                    comment={comment}
                />
            ))}
        </ul>
    )
}

export default ListComment;