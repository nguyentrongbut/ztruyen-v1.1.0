'use client'

// ** Next
import {useRouter} from "next/navigation";

// ** Icons
import {Heart, HeartCrack} from "lucide-react"

// ** Component
import Button from "@/components/common/Button"
import useGetMethod from "@/hooks/common/useGetMethod"
import useMutateMethod from "@/hooks/common/useMutateMethod"

// ** Types
import {IFavoriteToggle} from "@/types/api"

// ** Config
import {CONFIG_TAG} from "@/configs/tag"

// ** Service
import {FavoriteService} from "@/services/api/favorite"

// ** Toast
import toast from "react-hot-toast"

// ** Skeleton
import FavoriteBtnSkeleton from "@/skeletons/truyen-tranh/FavoriteBtnSkeleton";

// ** Lib
import {invalidateFavorite} from "@/lib/invalidate-cache/invalidateFavorite";

// ** Hook
import {useAuth} from "@/hooks/common/useAuth";


type TFavoriteBtn = {
    slug: string
    comicName: string
    comicCover: string
    isBorder?: boolean
}

export type TFavoriteBtnPayload = {
    comic_slug: string
    comic_name: string
    comic_cover: string
}

const FavoriteBtn = ({slug, comicName, comicCover, isBorder = true}: TFavoriteBtn) => {

    const router = useRouter()

    const {isLogin, loading} = useAuth();

    const {data: favorite, isLoading} = useGetMethod<IFavoriteToggle>({
        api: () => FavoriteService.check(slug),
        key: `${CONFIG_TAG.FAVORITE.INDEX}-${slug}`,
        revalidateIfStale: false,
    })

    const {trigger, isMutating} = useMutateMethod<IFavoriteToggle, TFavoriteBtnPayload>({
        api: (arg) => FavoriteService.toggle(arg),
        key: CONFIG_TAG.FAVORITE.TOGGLE,
        onSuccess: async () => {
            await invalidateFavorite(slug)
        }
    })

    const handleToggleFavorite = async () => {

        if (!isLogin) {
            toast.error("Đăng nhập để thêm truyện vào danh sách yêu thích nhe ~")

            router.push("/dang-nhap")
            return
        }

        const isRemoving = favorite?.isFavorite

        await trigger({
            comic_slug: slug,
            comic_name: comicName,
            comic_cover: comicCover,
        })

        toast.success(
            isRemoving
                ? "Đã bỏ truyện khỏi danh sách yêu thích"
                : "Đã thêm truyện vào danh sách yêu thích"
        )
    }

    if (isLoading || loading) return <FavoriteBtnSkeleton/>

    return (
        <Button
            sizeCustom='xs'
            variant='outline'
            disabled={isMutating}
            className='rounded-xs w-full sm:max-w-[140px]'
            width='full'
            onClick={handleToggleFavorite}
        >
            {favorite?.isFavorite ? (
               <>
                   <Heart className="text-red-500 fill-red-500"/>
                   <span>Bỏ yêu thích</span>
               </>
            ) : (
                <>
                    <Heart/>
                    <span>Yêu thích</span>
                </>
            )}

        </Button>
    )
}

export default FavoriteBtn