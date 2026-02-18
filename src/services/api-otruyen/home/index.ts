'use server'

// ** Next
import {unstable_cache} from "next/cache";

// ** lib
import {fetcher} from "@/lib/fetcher";

// ** Config
import {CONFIG_API_OTRUYEN} from "@/configs/api-otruyen";
import {CONFIG_TAG_OTRUYEN} from "@/configs/tag-otruyen";

// ** Type
import {IOtruyenListComic} from "@/types/api.otruyen";

export const getListHome = unstable_cache(
    async () => {
        return fetcher<IApiOtruyenResWPagination<IOtruyenListComic[]>>(CONFIG_API_OTRUYEN.HOME);
    },
    [CONFIG_TAG_OTRUYEN.HOME],
    {
        revalidate: 60,
    }
)