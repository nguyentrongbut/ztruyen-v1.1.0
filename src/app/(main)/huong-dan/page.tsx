// ** Next
import {Metadata} from "next"
import Link from "next/link";

// ** Shadcn ui
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const dynamic = 'force-static'

export const metadata: Metadata = {
    title: "Hướng dẫn sử dụng - ZTruyen",
    description:
        "Hướng dẫn sử dụng ZTruyen. Tìm hiểu cách đọc truyện, tạo tài khoản, lưu truyện yêu thích và các tính năng khác trên website đọc truyện trực tuyến ZTruyen.",
    alternates: {
        canonical: "https://ztruyen.io.vn/huong-dan",
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Hướng dẫn sử dụng - ZTruyen",
        description:
            "Tìm hiểu cách sử dụng ZTruyen, từ đăng ký tài khoản đến đọc truyện và các tính năng nâng cao.",
        url: "https://ztruyen.io.vn/huong-dan",
        siteName: "ZTruyen",
        images: [
            {
                url: "/og-ztruyen.png",
                width: 1200,
                height: 630,
                alt: "ZTruyen - Đọc truyện online",
            },
        ],
        type: "article",
    },
    twitter: {
        card: "summary_large_image",
        title: "Hướng dẫn sử dụng - ZTruyen",
        description:
            "Hướng dẫn chi tiết cách sử dụng các tính năng trên nền tảng đọc truyện ZTruyen.",
        images: ["/og-ztruyen.png"],
    },
}

const guides = [
    {
        slug: "cai-pwa-android",
        platform: "android",
        badge: "Android",
        title: "Hướng dẫn cài PWA trên Android",
        desc: "Cài ZTruyen như một ứng dụng thật trên điện thoại Android — không cần CH Play, dùng mượt như app native.",
    },
    {
        slug: "cai-pwa-iphone",
        platform: "iphone",
        badge: "iPhone / iOS",
        title: "Hướng dẫn cài PWA trên iPhone",
        desc: "Thêm ZTruyen vào màn hình chính iPhone qua Safari, trải nghiệm đọc truyện toàn màn hình không thanh địa chỉ.",
    },
    {
        slug: "cai-pwa-desktop",
        platform: "desktop",
        badge: "Desktop / Laptop",
        title: "Hướng dẫn cài PWA trên Desktop",
        desc: "Cài ZTruyen trên máy tính Windows, macOS hoặc Linux — đọc truyện trong cửa sổ riêng, nhanh và tiện lợi hơn.",
    },
    {
        slug: "tat-thong-bao-android",
        platform: "android",
        badge: "Android",
        title: "Hướng dẫn tắt thông báo trên Android",
        desc: "Tắt hoặc quản lý thông báo từ ZTruyen trên điện thoại Android, tránh làm phiền khi không cần thiết.",
    },
    {
        slug: "tat-thong-bao-iphone",
        platform: "iphone",
        badge: "iPhone / iOS",
        title: "Hướng dẫn tắt thông báo trên iPhone",
        desc: "Tắt thông báo từ ZTruyen trên iPhone nhanh chóng qua Cài đặt hoặc trực tiếp trong Safari.",
    },
    {
        slug: "tat-thong-bao-desktop",
        platform: "desktop",
        badge: "Desktop / Laptop",
        title: "Hướng dẫn tắt thông báo trên Desktop",
        desc: "Chặn hoặc tắt thông báo từ ZTruyen trên trình duyệt máy tính Chrome, Edge, Firefox một cách dễ dàng.",
    },
]

const GuidePage = () => {
    return (
        <div className="min-h-screen bg-background container py-10">
            {/*Breadcrumb*/}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href='/'>Trang chủ</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className='text-primary'/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Hướng dẫn sử dụng</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {guides.map((guide) => (
                    <Link
                        key={guide.slug}
                        href={`/huong-dan/${guide.slug}`}
                        className="group border rounded-xl p-6 hover:shadow-md transition-all hover:-translate-y-1 bg-card"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wide text-setting">
                            {guide.badge}
                        </span>
                        <h2 className="font-bold text-base mt-1 mb-2 group-hover:text-primary transition-colors">
                            {guide.title}
                        </h2>
                        <p className="text-sm text-setting dark:text-white/60 leading-relaxed">{guide.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default GuidePage
