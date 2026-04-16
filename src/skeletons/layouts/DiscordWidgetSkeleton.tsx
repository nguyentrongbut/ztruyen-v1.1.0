// ** Shadcn ui
import {Skeleton} from "@/components/ui/skeleton";

const DiscordWidgetSkeleton = () => {
    return (
        <div
            className="flex items-center gap-4 flex-wrap p-3 rounded-lg bg-white/[0.04] border border-white/[0.08] w-fit overflow-hidden">
            {/* Icon + name + online */}
            <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
                {/* Discord icon */}
                <Skeleton className="size-10 rounded-full flex-shrink-0"/>

                <div className="min-w-0 space-y-1.5">
                    {/* Server name */}
                    <Skeleton className="h-3.5 w-24 rounded"/>
                    {/* Online count */}
                    <Skeleton className="h-2.5 w-16 rounded"/>
                </div>
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-white/10 flex-shrink-0"/>

            {/* Avatar group */}
            <div className="flex items-center flex-1 min-w-0">
                <div className="flex -space-x-2">
                    {Array.from({length: 4}).map((_, i) => (
                        <Skeleton
                            key={i}
                            className="size-7 rounded-full border-2 border-[#212121]"
                        />
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <Skeleton className="h-8 w-16 rounded-md flex-shrink-0"/>
        </div>
    );
};

export default DiscordWidgetSkeleton;