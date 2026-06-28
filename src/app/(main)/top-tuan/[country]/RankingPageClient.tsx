'use client'

// ** Next
import Link from "next/link";

// ** Components
import ErrorText from "@/components/common/ErrorText";
import ComicItemHorizontal from "@/components/common/ComicItemHorizontal";

// ** Hooks
import useGetMethod from "@/hooks/common/useGetMethod";

// ** Services
import {getTopComic} from "@/services/api/comic";

// ** Shadcn ui
import {Skeleton} from "@/components/ui/skeleton";

// ** Type
import {IComic} from "@/types/api";
import {TStatus} from "@/types/api.otruyen";
import {TQueryParams} from "@/utils/buildQueryString";

// ** Utils
import {getCountryLabel} from "@/utils/getCountryLabel";

// ** Lib
import {cn} from "@/lib/utils";

// ** Config
import {CONFIG_SLUG} from "@/configs/slug";

type TRankingPageClient = {
    countryComic: string
}

const COUNTRY_TABS = [
    {label: "Trung", value: "trung"},
    {label: "Nhật", value: "nhat"},
    {label: "Hàn", value: "han"},
]

const COUNTRY_DESC: Record<string, string> = {
    trung: "Những bộ manhua Trung Quốc được đọc nhiều nhất tuần này.",
    nhat: "Những bộ manga Nhật Bản được yêu thích nhất tuần qua.",
    han: "Những bộ manhwa Hàn Quốc đang hot nhất tuần này.",
}

const RankingPageClient = ({countryComic}: TRankingPageClient) => {
    const queryParams: TQueryParams = {
        page: 1,
        limit: 50,
        sort: 'rank',
        filters: {
            country: [countryComic]
        },
    }

    const {data, isLoading, error} = useGetMethod<IModelPaginate<IComic>>({
        api: () => getTopComic(queryParams),
        key: ['top-week', countryComic],
        revalidateIfStale: false,
    })

    const listTopComic = data?.result ?? []

    const countryLabel = getCountryLabel(countryComic)
    const desc = COUNTRY_DESC[countryComic] ?? `Top truyện ${countryLabel} được đọc nhiều nhất tuần qua.`

    return (
        <section className='pb-20'>

            <div className='section-header gap-2.5 sm:gap-4 flex-col md:flex-row container py-5'>
                <h1 className='heading py-0' title={`Top truyện ${countryLabel} hot nhất tuần qua`}>
                    Top truyện {countryLabel} hot nhất tuần qua
                </h1>
                <p className='desc'>{desc}</p>
            </div>
            <nav className="container flex items-baseline gap-4 pb-6">
                <p className="flex-shrink-0 text-sm dark:text-[#ffffffbd] text-[#00000057]">
                    Quốc gia
                </p>

                <ul className="flex flex-wrap text-sm">
                    {COUNTRY_TABS.map((tab) => {
                        const isActive = countryComic === tab.value

                        return (
                            <li key={tab.value}>
                                <Link
                                    href={`/${CONFIG_SLUG.TOP_WEEK}/${tab.value}.html`}
                                    className={cn(
                                        "cursor-pointer px-[10px] py-1 transition active:text-primary block",
                                        isActive && "text-primary"
                                    )}
                                >
                                    {tab.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className='container'>
                {isLoading ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
                        {Array.from({length: 12}).map((_, index) => (
                            <div key={index} className='flex gap-4'>
                                <Skeleton className='h-[180px] aspect-[3/4] rounded-md'/>

                                <div className='w-[180px] flex flex-col justify-between'>
                                    <div className='space-y-2'>
                                        <Skeleton className='h-4 w-full'/>
                                        <Skeleton className='h-4 w-5/6'/>
                                        <Skeleton className='h-4 w-2/3'/>
                                    </div>

                                    <Skeleton className='h-3 w-1/2 mt-2'/>

                                    <div className='space-y-2 mt-3'>
                                        <Skeleton className='h-3 w-1/3'/>
                                        <Skeleton className='h-3 w-2/3'/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <ErrorText/>
                ) : listTopComic.length <= 0 ? (
                    <p className='text-center py-10'>Chưa có truyện nào trong bảng xếp hạng tuần này.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12'>
                        {listTopComic.map((comic) => {
                            return (
                                <ComicItemHorizontal
                                    key={comic._id}
                                    name={comic.name}
                                    thumbUrl={comic.thumb_url}
                                    slug={comic.slug}
                                    status={comic.status as TStatus}
                                    author={comic.authors}
                                    chapterName={comic.latest_chapter}
                                    chapterApiData={comic.chapter_api_data}
                                    rank={comic.rank}
                                />
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}

export default RankingPageClient