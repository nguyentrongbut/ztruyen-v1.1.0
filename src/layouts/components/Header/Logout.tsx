'use client'

// ** Next
import {useRouter} from "next/navigation";

// ** React hot toast
import toast from "react-hot-toast";

// ** Swr
import {mutate} from "swr";

// ** Components
import Loading from "@/components/common/Loading";

// ** Icon
import {LogOut} from "lucide-react";

// ** Hooks
import useMutateMethod from "@/hooks/common/useMutateMethod";

// ** Config
import {CONFIG_TAG} from "@/configs/tag";

// ** Service
import {AuthService} from "@/services/api/auth";

// ** Event
import {AUTH_CHANGE_EVENT} from "@/hooks/common/useAuth";

// ** Lib
import {destroyFCM} from "@/lib/fcm/fcm";

const Logout = () => {

    const router = useRouter();

    const {trigger, isMutating} = useMutateMethod<null, void>({
        api: () => AuthService.logout(),
        key: CONFIG_TAG.AUTH.LOGOUT,
        onSuccess: async (res) => {
            toast.success(res.message)
            await mutate(() => true, undefined, {revalidate: false})
            window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
            router.refresh()
        }
    })


    const handleLogout = async () => {
        await Promise.allSettled([
            destroyFCM(),
            trigger()
        ])
    }

    return (
        <>
            <div
                className={`text-destructive flex gap-2 cursor-pointer w-full ${isMutating ? 'pointer-events-none opacity-50' : ''}`}
                onClick={handleLogout}
            >
                <LogOut className="text-inherit"/>
                Đăng xuất
            </div>

            {isMutating && <Loading/>}
        </>
    )
}

export default Logout