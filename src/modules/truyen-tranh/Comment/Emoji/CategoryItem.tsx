'use client'

// ** Next
import Image from "next/image";

// ** React
import {useState} from "react";

// ** Type
import {IEmojiCategories} from "@/types/api";

// ** Lib
import {cn} from "@/lib/utils";

type TCategoryItem = {
    category: IEmojiCategories,
    isActive: boolean,
    onClick: () => void
}

const CategoryItem = ({ category, isActive, onClick }: TCategoryItem) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div
            onClick={onClick}
            className={cn(
                'w-[58px] h-[36px] cursor-pointer flex justify-center items-center hover:bg-[#E3E5E7] dark:hover:bg-[#3c3c3c]',
                isActive && 'bg-white dark:bg-[#3c3c3c]',
            )}
        >
            {category.name === 'Kaomoji' ? (
                <span className="text-[10px] dark:text-white">(＾▽＾)</span>
            ) : (
                <div className='relative size-[22px]'>
                    {!loaded && (
                        <div className='absolute inset-0 rounded bg-[#e3e5e7] dark:bg-[#3c3c3c] animate-pulse' />
                    )}
                    <Image
                        src={category.image.url}
                        alt={category.name}
                        fill
                        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setLoaded(true)}
                    />
                </div>
            )}
        </div>
    )
}

export default CategoryItem