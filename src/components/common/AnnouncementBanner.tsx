'use client';

// ** React
import {useEffect, useState} from 'react';

// ** Icons
import {X} from 'lucide-react';

// ** Hook
import useGetMethod from "@/hooks/common/useGetMethod";

// ** Type
import {IAnnouncement} from '@/types/api';

// ** Service
import {AnnouncementService} from '@/services/api/announcement';

// ** Configs
import {CONFIG_TAG} from "@/configs/tag";
import {VARIABLE} from "@/configs/variable";

// ** Util
import {BadgeAnnouncement} from "@/utils/getBadgeAnnouncement";

export default function AnnouncementBanner() {
    const [dismissed, setDismissed] = useState(false);

    const { data: announcement, isLoading } = useGetMethod<IAnnouncement>({
        api: () => AnnouncementService.active(),
        key: CONFIG_TAG.ANNOUNCEMENT.ACTIVE,
    })

    const shouldShow = (() => {
        if (!announcement || dismissed) return false;
        if (announcement.type === 'maintenance') return true;
        try {
            return localStorage.getItem(VARIABLE.SEEN_KEY) !== announcement._id;
        } catch {
            return true;
        }
    })();

    const dismiss = (id: string) => {
        try {
            localStorage.setItem(VARIABLE.SEEN_KEY, id);
        } catch {}
        setDismissed(true);
    };

    useEffect(() => {
        if (shouldShow) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [shouldShow]);

    if (isLoading || !shouldShow || !announcement) return null;

    const isMaintenance = announcement.type === 'maintenance';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-background rounded-2xl p-6 max-w-md w-full mx-4 relative shadow-xl">

                {/* Nút đóng — ẩn nếu là bảo trì */}
                {!isMaintenance && (
                    <button
                        onClick={() => dismiss(announcement._id)}
                        aria-label="Đóng thông báo"
                        className="absolute top-4 right-4 size-8 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                        <X className="size-4"/>
                    </button>
                )}

                <div className="overflow-hidden max-h-[90dvh]">

                    {/* Header */}
                    <div className="section-header justify-center">
                        <h2 className="heading text-primary py-2">Thông báo!</h2>
                    </div>

                    {/* Content */}
                    <div className="text-sm space-y-3 mt-3">

                        {/* Title + Badge */}
                        <div className="flex gap-2 items-center">
                            <p className="font-semibold">{announcement.title}</p>
                            {BadgeAnnouncement[announcement.type]}
                        </div>

                        {/* Body */}
                        <div
                            className="leading-relaxed"
                            dangerouslySetInnerHTML={{__html: announcement.content}}
                        />

                        {/* Footer */}
                        <p className="text-center text-gray-400 italic text-xs">
                            {isMaintenance
                                ? 'Vui lòng quay lại sau ít phút ~ Cảm ơn bạn đã đồng hành! ❤️'
                                : 'Cảm ơn bạn đã đồng hành cùng Ztruyện! ❤️'
                            }
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}