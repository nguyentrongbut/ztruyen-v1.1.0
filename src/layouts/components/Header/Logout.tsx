'use client'

// ** Next
import {useRouter} from "next/navigation";

// ** React
import {useState} from "react";

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
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const {trigger, isMutating} = useMutateMethod<null, void>({
        api: () => AuthService.logout(),
        key: CONFIG_TAG.AUTH.LOGOUT,
        onSuccess: async (res) => {
            toast.success(res.message)
            await mutate(CONFIG_TAG.USER.PROFILE, null, {revalidate: false})
            window.dispatchEvent(new Event(AUTH_CHANGE_EVENT))
            router.refresh()
        }
    })


    const handleLogout = async () => {
        setIsLoggingOut(true)
        await destroyFCM()
        await trigger()
        setIsLoggingOut(false)
    }

    const isPending = isMutating || isLoggingOut

    return (
        <>
            <div
                className={`text-destructive flex gap-2 cursor-pointer w-full ${isPending ? 'pointer-events-none opacity-50' : ''}`}
                onClick={handleLogout}
            >
                <LogOut className="text-inherit"/>
                Đăng xuất
            </div>

            {isPending  && <Loading/>}
        </>
    )
}

export default Logout