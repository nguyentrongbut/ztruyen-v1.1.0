// ** React
import {ReactNode} from "react";

// ** Icon
import {Info, MessageCircle, ThumbsUp} from "lucide-react";

// ** Type
import {NotificationFCMType} from "@/components/common/NotificationListener";

export const getBadgeNotification: Record<NotificationFCMType, { bg: string; icon: ReactNode }> = {
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
