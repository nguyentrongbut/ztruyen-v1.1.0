'use client';

// ** Next
import Link from "next/link";
import Image from "next/image";

// ** React
import {useEffect, useState} from "react";

// ** SWR
import useSWR from "swr";

// ** Hooks
import useLazyLoad from "@/hooks/common/useLazyLoad";
import useTailwindBreakpoints from "@/hooks/common/useTailwindBreakpoints";

// ** Services
import {DiscordService} from "@/services/api/discord";

// ** shadcn/ui
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
    AvatarImage,
} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";

// ** Skeleton
import DiscordWidgetSkeleton from "@/skeletons/layouts/DiscordWidgetSkeleton";

// ** Config
import {CONFIG_TAG} from "@/configs/tag";
import {CONFIG_IMG} from "@/configs/img";


const DiscordWidget = () => {

    const [shouldFetch, setShouldFetch] = useState(false);

    const {isSm} = useTailwindBreakpoints()

    const {ref, enabled} = useLazyLoad({
        threshold: 0.1,
        rootMargin: '100px',
    });

    useEffect(() => {
        if (enabled) setShouldFetch(true);
    }, [enabled]);

    const {data, error, isLoading, mutate} = useSWR(
        shouldFetch ? CONFIG_TAG.DISCORD.WIDGET : null,
        () => DiscordService.widget(),
        {
            refreshInterval: 30000,
            revalidateOnReconnect: true,
        }
    );

    const maxVisible = !isSm ? 1 : 4;
    const visibleMembers = data?.members?.slice(0, maxVisible) ?? [];
    const remainingCount = data?.members
        ? Math.max(0, data.members.length - maxVisible)
        : 0;

    if (!enabled) {
        return (
            <div ref={ref} className="min-h-[65.6px] w-fit">
                <DiscordWidgetSkeleton/>
            </div>
        );
    }

    if (isLoading || !data) {
        return (
            <div className="w-fit">
                <DiscordWidgetSkeleton/>
            </div>
        );
    }

    if (error) {
        return (
            <div
                ref={ref}
                className="flex items-center justify-between gap-3 p-3 rounded-lg bg-white/5 border border-white/8 text-sm text-white/40 w-full max-w-[320px]"
            >
                <span>Không thể tải Discord</span>
                <button
                    onClick={() => mutate()}
                    className="text-xs underline underline-offset-2"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="flex items-center gap-4 flex-wrap p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] w-fit overflow-hidden"
        >
            {/* Icon + tên + online */}
            <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
                <div className="relative size-10 flex-shrink-0">
                    <Image src={CONFIG_IMG.DISCORD} alt="discord" fill/>
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-medium text-white leading-tight truncate">
                        {data.name}
                    </p>

                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="relative flex h-1.5 w-1.5">
                            <span
                                className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"/>
                        </span>

                        <span className="text-[11px] text-white/50">
                            {data.presence_count} online
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/10 flex-shrink-0"/>

            {/* Avatar group */}
            {data.members?.length > 0 && (
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <AvatarGroup>
                        {visibleMembers.map((member) => (
                            <Avatar
                                key={member.id}
                                className="size-7 border-2 border-[#212121]"
                            >
                                <AvatarImage
                                    src={member.avatar_url}
                                    alt={member.username}
                                />
                                <AvatarFallback className="text-[10px] bg-white/10 text-white/60">
                                    {member.username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        ))}

                        {remainingCount > 0 && (
                            <AvatarGroupCount
                                className="size-7 border-2 text-xs">
                                +{remainingCount}
                            </AvatarGroupCount>
                        )}
                    </AvatarGroup>
                </div>
            )}

            {/* CTA */}
            <Button
                asChild
                size="sm"
                className="text-white border-0 flex-shrink-0 text-xs h-8"
            >
                <Link
                    href={data.instant_invite || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Tham gia
                </Link>
            </Button>
        </div>
    );
};

export default DiscordWidget;