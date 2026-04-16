// ** Next
import Link from 'next/link';

// ** Components
import Tag from '@/components/common/Tag';
import Logo from '@/components/common/Logo';
import InstallPWAButton from '@/components/common/InstallPWAButton';

// ** Layout component
import DiscordWidget from "@/layouts/components/Footer/DiscordWidget";

// ** Configs
import {tagsFooter} from '@/configs/footer';

// ** Icons (dùng lucide-react hoặc react-icons tùy project)
import {Facebook, Youtube} from 'lucide-react';

// TikTok không có trong lucide, dùng SVG inline
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="size-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
);

const socials = [
    {
        label: 'Facebook',
        href: 'https://facebook.com/Ztruyen-io-vn-61582484157563',
        icon: <Facebook className="size-4"/>,
    },
    {
        label: 'YouTube',
        href: 'https://youtube.com/@jay31-9',
        icon: <Youtube className="size-4"/>,
    },
    {
        label: 'TikTok',
        href: 'https://tiktok.com/@jlikly',
        icon: <TikTokIcon/>,
    },
];

const Footer = () => {
    return (
        <footer className="w-full">
            <div className="bg-[#212121] pt-10 pb-5 shadow-layout border-t border-[#3a3a3a]">
                <div className="container text-white/70">
                    <div className="flex flex-col gap-6">
                        {/* Top */}
                        <div className="grid grid-cols-1 gap-y-6 md:grid-cols-2">
                            <div>
                                <Logo size="lg"/>
                            </div>
                            <ul className="flex flex-wrap gap-2">
                                {tagsFooter.map((tag) => (
                                    <Tag
                                        key={tag.title}
                                        href={tag.href}
                                        theme="dark"
                                    >
                                        {tag.title}
                                    </Tag>
                                ))}
                            </ul>
                        </div>

                        {/* Disclaimer */}
                        <div className="space-y-1.5">
                            <h3 className="font-semibold text-white/70 md:text-base">
                                Miễn trừ trách nhiệm
                            </h3>
                            <p className="text-sm leading-relaxed">
                                ZTruyen chỉ cung cấp giao diện và tổng hợp dữ
                                liệu từ
                                <strong className="mx-1 text-white/70">
                                    OTruyen
                                </strong>
                                . Chúng tôi không lưu trữ hoặc sở hữu nội dung
                                truyện. Thông tin hiển thị chỉ mang tính tham
                                khảo và
                                <strong className="mx-1 text-white/70">
                                    không chịu trách nhiệm
                                </strong>
                                về độ chính xác, liên kết ngoài hoặc nội dung do
                                bên thứ ba cung cấp.
                            </p>
                        </div>

                        <div className="border-t border-white/10"/>

                        {/* Discord + Socials */}
                        <div className="flex flex-wrap items-center gap-3">
                            <DiscordWidget/>

                            {/* Divider */}
                            <div className="w-px h-8 bg-white/10 hidden sm:block"/>

                            {/* Social icons */}
                            <div className="flex items-center gap-2">
                                {socials.map((social) => (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="flex items-center justify-center size-9 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        {social.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="flex flex-wrap items-center justify-between gap-y-3 text-sm">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                                <Link
                                    href="/thoa-thuan-nguoi-dung"
                                    target="_blank"
                                    className="hover:text-white/80 transition-colors"
                                >
                                    Thỏa thuận người dùng
                                </Link>
                                <span className="text-white/20">|</span>
                                <Link
                                    href="/chinh-sach-bao-mat"
                                    target="_blank"
                                    className="hover:text-white/80 transition-colors"
                                >
                                    Chính sách bảo mật
                                </Link>
                                <InstallPWAButton/>
                            </div>

                            <p className="text-sm font-medium">
                                © {new Date().getFullYear()} ZTruyen
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;