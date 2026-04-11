'use client'

// ** Next
import Image from "next/image";

// ** React
import {useState} from "react";

// ** Type
import {IEmoji} from "@/types/api";

// ** Lib
import {cn} from "@/lib/utils";

type TEmojiItem = {
    emoji: IEmoji;
    onEmojiSelect: (v: string) => void
}

const EmojiItem = ({ emoji, onEmojiSelect }: TEmojiItem) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div
            className='px-2 py-[5px] rounded-md hover:bg-[#e3e5e7] dark:hover:bg-[#3c3c3c] cursor-pointer'
            title={emoji.name}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
                const value = emoji.type === 'text' ? emoji.text! : `:${emoji.name}:`
                onEmojiSelect(value)
            }}
        >
            {emoji.type === 'text' ? (
                <span className='text-xs dark:text-white'>{emoji.text}</span>
            ) : (
                <div className={cn('relative size-6', emoji.isGif && 'size-20')}>
                    {!loaded && (
                        <div className='absolute inset-0 rounded bg-[#e3e5e7] dark:bg-[#3c3c3c] animate-pulse' />
                    )}
                    <Image
                        src={emoji.image?.url || ''}
                        alt={emoji.name}
                        fill
                        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setLoaded(true)}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiItem