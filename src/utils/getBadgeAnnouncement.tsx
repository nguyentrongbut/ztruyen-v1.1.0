// ** React
import {ReactNode} from "react";

// ** Type
import {AnnouncementType} from "@/types/api";

// ** Icons
import {AlertTriangle, Info, PartyPopper, Wrench} from "lucide-react";

export const BadgeAnnouncement: Record<AnnouncementType, ReactNode> = {
    info: (
        <span className="flex items-center gap-1.5 bg-blue-100 text-blue-500 text-xs font-medium px-2 py-0.5 rounded-full">
            <Info className="size-2"/> Thông tin
        </span>
    ),
    warning: (
        <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-500 text-xs font-medium px-2 py-0.5 rounded-full">
            <AlertTriangle className="size-2"/> Cảnh báo
        </span>
    ),
    maintenance: (
        <span className="flex items-center gap-1.5 bg-red-100 text-red-500 text-xs font-medium px-2 py-0.5 rounded-full">
            <Wrench className="size-2"/> Bảo trì
        </span>
    ),
    event: (
        <span className="flex items-center gap-1.5 bg-green-100 text-green-500 text-xs font-medium px-2 py-0.5 rounded-full">
            <PartyPopper className="size-2"/> Sự kiện
        </span>
    ),
};