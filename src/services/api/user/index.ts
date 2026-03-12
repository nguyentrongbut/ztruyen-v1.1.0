// ** lib
import {authFetcherWithRefresh} from "@/lib/auth-fetch";
import {removeAccessToken} from "@/lib/localStorage";

// ** Configs
import {CONFIG_API} from "@/configs/api";

// ** Types
import {IUserProfile} from "@/types/api";

// ** Module type
import {TUpdateProfilePayload} from "@/modules/tai-khoan/thong-tin-ca-nhan/FormUpdateProfile";

export type TUploadProfileImagePayload = {
    avatar?: string;
    avatar_frame?: string;
    cover?: string
}

export const UserService = {
    getProfile: async (): Promise<IApiRes<IUserProfile>> => {
        const res = await authFetcherWithRefresh<IApiRes<IUserProfile>>(CONFIG_API.USER.PROFILE)

        return res
    },
    updateProfile: async (payload: TUpdateProfilePayload): Promise<IApiRes<IUserProfile>> => {
        const res = await authFetcherWithRefresh<IApiRes<IUserProfile>>(CONFIG_API.USER.PROFILE, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        })

        return res
    },
    updateProfileImage: async (payload: TUploadProfileImagePayload): Promise<IApiRes<IUserProfile>> => {
        const res = await authFetcherWithRefresh<IApiRes<IUserProfile>>(CONFIG_API.USER.PROFILE, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        })

        return res
    },
    deleteProfile: async (): Promise<IApiRes<void>> => {
        const res = await authFetcherWithRefresh<IApiRes<void>>(CONFIG_API.USER.PROFILE, {
            method: 'DELETE',
        })

        removeAccessToken();

        return res
    }
}