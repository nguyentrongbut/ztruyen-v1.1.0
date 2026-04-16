'use client'

// ** Next
import Link from "next/link";
import Image from "next/image";

// ** Configs
import {CONFIG_API} from "@/configs/api";
import {CONFIG_IMG} from "@/configs/img";

type TProvider = 'google' | 'facebook' | 'discord'

const AuthFooter = () => {

    const loginSocialUrl = (provider: TProvider) => {
        let url: string;

        switch (provider) {
            case 'facebook':
                url = CONFIG_API.AUTH.FACEBOOK;
                break;
            case 'discord':
                url = CONFIG_API.AUTH.DISCORD;
                break;
            case 'google':
                url = CONFIG_API.AUTH.GOOGLE;
                break;
            default:
                return;
        }

        const width = 500;
        const height = 600;
        const left = Math.round((window.screen.width - width) / 2);
        const top = Math.round((window.screen.height - height) / 2);

        window.open(
            url,
            'oauth-popup',
            `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=yes`
        );
    }

    return (
        <div className='flex flex-col items-center text-zinc-400 text-sm mt-6'>
            <span>Các phương thức đăng nhập khác</span>
            {/*<div className='flex flex-col sm:flex-row gap-5 sm:gap-7 my-5 sm:my-3 justify-between'>*/}
            {/*    <div className='flex gap-2 items-center cursor-pointer' onClick={() => loginSocialUrl('google')}>*/}
            {/*        <Image src={CONFIG_IMG.GOOGLE} alt='Đăng nhập với Google' width={24} height={24}/>*/}
            {/*        Đăng nhập Google*/}
            {/*    </div>*/}
            {/*    <div className='flex gap-2 items-center cursor-pointer' onClick={() => loginSocialUrl('facebook')}>*/}
            {/*        <Image src={CONFIG_IMG.FACEBOOK} alt='Đăng nhập với Google' width={24} height={24}/>*/}
            {/*        Đăng nhập Facebook*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className='flex flex-col sm:flex-row gap-5 sm:gap-7 my-5 sm:my-4 justify-between items-center'>
                <div className='flex gap-2 items-center cursor-pointer' onClick={() => loginSocialUrl('google')}>
                    <div className='relative size-6'>
                        <Image src={CONFIG_IMG.GOOGLE} alt='Đăng nhập với Google' fill/>
                    </div>
                    Đăng nhập Google
                </div>
                <div className='flex gap-2 items-center cursor-pointer' onClick={() => loginSocialUrl('discord')}>
                    <div className='relative size-9'>
                        <Image src={CONFIG_IMG.DISCORD} alt='Đăng nhập với Discord' fill/>
                    </div>
                    Đăng nhập Discord
                </div>
            </div>
            <span className='text-center w-full md:w-[400px]'>Bằng cách đăng nhập hay hoàn tất đăng ký, bạn đã đồng ý với
                <Link className='text-primary' href='thoa-thuan-nguoi-dung'
                      target='_blank'> Thoả thuận người dùng </Link>
                và
                <Link className='text-primary' href='chinh-sach-bao-mat' target='_blank'> Chính sách bảo mât.</Link>
            </span>
        </div>
    )
}

export default AuthFooter