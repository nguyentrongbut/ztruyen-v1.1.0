'use server'

// ** Next
import {unstable_cache} from "next/cache";

// ** lib
import {fetcher} from "@/lib/fetcher";

// ** Config
import {CONFIG_API_OTRUYEN} from "@/configs/api-otruyen";
import {CONFIG_TAG_OTRUYEN} from "@/configs/tag-otruyen";
import {CACHE_TIME} from "@/configs/cache-time";

// ** Type
import {IOtruyenDetailComic} from "@/types/api.otruyen";

export async function getDetailComic(slug: string) {
    return unstable_cache(
        async () => {
            return fetcher<IApiOtruyenResDetail<IOtruyenDetailComic>>(
                `${CONFIG_API_OTRUYEN.COMIC}/${slug}`
            );
        },
        [
            CONFIG_TAG_OTRUYEN.DETAIL,
            slug,
        ],
        {
            revalidate: CACHE_TIME.HOUR,
        }
    )();
}