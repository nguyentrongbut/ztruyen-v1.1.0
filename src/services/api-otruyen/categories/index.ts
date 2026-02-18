'use server'

// ** Next
import {unstable_cache} from "next/cache";

// ** lib
import {fetcher} from "@/lib/fetcher";

// ** Config
import {CONFIG_API_OTRUYEN} from "@/configs/api-otruyen";
import {CONFIG_TAG_OTRUYEN} from "@/configs/tag-otruyen";

// ** Type
import {IOtruyenListComic, IOtruyenListGenre} from "@/types/api.otruyen";
import {ESortField} from "@/types/enum";

export const getListGenre = unstable_cache(
    async () => {
        return fetcher<IApiOtruyenRes<IOtruyenListGenre[]>>(CONFIG_API_OTRUYEN.CATEGORY);
    },
    [CONFIG_TAG_OTRUYEN.CATEGORY],
    {
        revalidate: 3600,
    }
)

export const getListByGender = unstable_cache(
    async (slug: string, pageQuery: number = 1, sortField: ESortField = ESortField.UPDATED_AT) => {
        return fetcher<IApiOtruyenResWPagination<IOtruyenListComic[]>>(`${CONFIG_API_OTRUYEN.CATEGORY}/${slug}?page=${pageQuery}&sort_field=${sortField}`);
    },
    [CONFIG_TAG_OTRUYEN.CATEGORY],
    {
        revalidate: 30,
    }
)