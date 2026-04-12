// ** Shadcn ui
import {Skeleton} from "@/components/ui/skeleton";

const RadioBannerSkeleton = () => {
    return (
       <div className='space-y-3'>
           {[...Array(3)].map((_, i) => (
               <Skeleton key={i} className='w-full h-[94.6px] sm:h-[83px] rounded-xl'/>
           ))}
       </div>
    )
}

export default RadioBannerSkeleton