// ** lib
import {authFetcherWithRefresh} from "@/lib/auth-fetch";

// ** Configs
import {CONFIG_API} from "@/configs/api";

// ** Type
import {INotification} from "@/types/api";

// ** Util and type
import {buildQueryString, TQueryParams} from "@/utils/buildQueryString";

export const NotificationService = {
    list: (params: TQueryParams): Promise<IApiRes<IModelPaginateNotification<INotification>>> => {
        const query = buildQueryString(params)
        return authFetcherWithRefresh<IApiRes<IModelPaginateNotification<INotification>>>(
            `${CONFIG_API.NOTIFICATION.INDEX}?${query}`
        )
    },
}