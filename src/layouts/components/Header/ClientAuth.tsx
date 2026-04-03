'use client'

// ** Next
import Link from "next/link";

// ** Component
import AccountMenu from "@/layouts/components/Header/AccountMenu";

// ** Hooks
import {useAuth} from "@/hooks/common/useAuth";

const ClientAuth = () => {

    const { isLogin, loading } = useAuth();

    if (loading) return null;

    return (
        <>
            {isLogin ? (
                <AccountMenu/>
            ) : (
                <Link href='/dang-nhap' className='text-header hidden xl:block'>Đăng nhập</Link>
            )}
        </>
    )
}

export default ClientAuth;