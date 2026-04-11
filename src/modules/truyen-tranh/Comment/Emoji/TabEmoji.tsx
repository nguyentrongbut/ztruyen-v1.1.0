'use client'

// ** React
import {useState} from "react";

// ** Shadcn ui
import {PopoverTitle} from "@/components/ui/popover";

// ** Type
import {IEmoji, IEmojiCategories} from "@/types/api";

// ** Service
import {EmojiCategoriesService} from "@/services/api/emoji-categories";
import {EmojiService} from "@/services/api/emoji";

// ** Hook
import useGetMethod from "@/hooks/common/useGetMethod";
import useInfiniteLoad from "@/hooks/common/useInfiniteLoad";
import useSentinel from "@/hooks/common/useSentinel";

// ** Tag
import {CONFIG_TAG} from "@/configs/tag";

// ** Module
import EmojiItem from "@/modules/truyen-tranh/Comment/Emoji/EmojiItem";
import CategoryItem from "@/modules/truyen-tranh/Comment/Emoji/CategoryItem";

const LIMIT = 48;

type TTabEmoji = {
    onEmojiSelect: (value: string) => void
}

const TabEmoji = ({onEmojiSelect}: TTabEmoji) => {
    const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);

    const {data: emojiCategories, isLoading} = useGetMethod<IEmojiCategories[]>({
        api: () => EmojiCategoriesService.list(),
        key: [CONFIG_TAG.EMOJI_CATEGORIES.LIST],
        revalidateIfStale: false,
    });

    const activeCategoryId = activeCategory ?? emojiCategories?.[0]?._id;

    const {
        data: emojis,
        isLoading: isEmojiLoading,
        isValidating,
        loadMore,
    } = useInfiniteLoad<IEmoji>({
        key: `${CONFIG_TAG.EMOJI.LIST}-${activeCategoryId}`,
        enabled: !!activeCategoryId,
        api: (page) =>
            EmojiService.list({
                page,
                limit: LIMIT,
                filters: {category: [activeCategoryId as string]},
            }).then(res => res.data as IModelPaginate<IEmoji>),
    });

    const {sentinelRef} = useSentinel({onIntersect: loadMore});

    if (isLoading || !emojiCategories?.length) return null;

    const currentCategory =
        emojiCategories.find((c) => c._id === activeCategory) ?? emojiCategories[0];

    return (
        <>
            <PopoverTitle className='pt-3.5 pb-1.5 text-sm px-[15px] dark:text-white'>
                {currentCategory.name}
            </PopoverTitle>

            {/* Danh sách emoji */}
            <div className='h-[198px] overflow-y-auto'>
                <div className='flex flex-wrap px-3'>
                    {isEmojiLoading ? (
                        // Skeleton loading
                        [...Array(30)].map((_, i) => (
                            <div
                                key={i}
                                className='px-2 py-[5px] w-10 h-9 rounded-md bg-[#e3e5e7] animate-pulse m-0.5'
                            />
                        ))
                    ) : (
                        emojis.map((emoji) => (
                            <EmojiItem key={emoji._id} emoji={emoji} onEmojiSelect={onEmojiSelect}/>
                        ))
                    )}

                    {/* Sentinel để load more khi scroll */}
                    {isValidating && (
                        [...Array(5)].map((_, i) => (
                            <div
                                key={`loading-${i}`}
                                className='px-2 py-[5px] w-10 h-9 rounded-md bg-[#e3e5e7] animate-pulse m-0.5'
                            />
                        ))
                    )}
                    <div ref={sentinelRef}/>
                </div>
            </div>

            {/* Tab categories */}
            <div className='flex bg-[#f1f2f3] dark:bg-[#2c2c2c]'>
                {emojiCategories.map((category) => (
                    <CategoryItem
                        key={category._id}
                        category={category}
                        isActive={activeCategoryId === category._id}
                        onClick={() => setActiveCategory(category._id)}
                    />
                ))}
            </div>
        </>
    );
};

export default TabEmoji;