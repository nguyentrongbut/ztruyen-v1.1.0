const baseUrl = process.env.NEXT_PUBLIC_API_OTRUYEN_URL;

export const CONFIG_API_OTRUYEN = {
    HOME: `${baseUrl}/home`,
    LIST: `${baseUrl}/danh-sach`,
    CATEGORY: `${baseUrl}/the-loai`,
    COMIC: `${baseUrl}/truyen-tranh`,
    SEARCH: `${baseUrl}/tim-kiem`,
    TEST: `${baseUrl}/dd`,
    IMAGE_COMIC: process.env.NEXT_PUBLIC_API_OTRUYEN_IMAGE_COMIC,
} as const