'use client'

// ** SWR
import useSWRMutation from 'swr/mutation'
import {mutate} from "swr";

// ** Next
import { useRouter } from 'next/navigation'

// ** Toast
import toast from 'react-hot-toast'

// ** Services
import { UserService } from '@/services/api/user'

// ** Config
import { CONFIG_TAG } from '@/configs/tag'

export const useDeleteAccount = () => {
    const router = useRouter()

    return useSWRMutation(
        CONFIG_TAG.USER.DELETE_PROFILE,
        async () => {
            return await UserService.deleteProfile()
        },
        {
            onSuccess: (data) => {
                toast.success(data.message)

                // clear profile cache
                mutate(CONFIG_TAG.USER.PROFILE, null, false)

                router.refresh()
            },
            onError(error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Đã có lỗi xảy ra khi xoá tài khoản cá nhân'
                )
            },
        }
    )
}
