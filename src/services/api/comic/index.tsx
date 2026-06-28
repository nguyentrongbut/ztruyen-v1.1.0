// ** lib
import {fetcher} from "@/lib/fetcher";

// ** Config
import {CONFIG_API} from "@/configs/api";

// ** Utils
import {buildQueryString, TQueryParams} from "@/utils/buildQueryString";

// ** Type
import {IComic} from "@/types/api";

export async function getTopComic(params: TQueryParams) {
    const query = buildQueryString(params);

    return fetcher<IApiRes<IModelPaginate<IComic>>>(
        `${CONFIG_API.COMIC.INDEX}?${query}`
    );
}