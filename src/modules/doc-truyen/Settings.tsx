'use client'

// ** Shadcn ui
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

// ** Icon
import {Bolt} from "lucide-react";

// ** Type
import {TBannerMode} from "@/hooks/common/useBannerMode";

// ** Config
import {BANNER_OPTIONS} from "@/configs/page";

type TSettings = {
    bannerMode: TBannerMode | null;
    onBannerModeChange: (mode: TBannerMode) => void;
}

const Settings = ({bannerMode, onBannerModeChange}: TSettings) => {

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <div className='flex flex-col items-center gap-1 p-2 cursor-pointer text-setting'>
                    <Bolt className="size-5"/>
                    <span className="text-white text-xs">Cài đặt</span>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent asChild>
                <div className="p-4 rounded-2xl w-[240px] sm:w-[280px] !bg-[#272727e6] border-none text-white mb-2">
                    {/* Banner mode */}
                    <p className="text-xs text-white/50 mb-2 px-1">Ẩn banner quảng cáo</p>
                    <div className='bg-[#121212] rounded-2xl overflow-auto max-h-[320px] sm:max-h-[400px] no-scrollbar'>
                        {BANNER_OPTIONS.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => onBannerModeChange(option.value)}
                                asChild
                            >
                                <div
                                    className={`px-5 sm:px-10 py-3 block text-xs sm:text-sm text-center hover:!bg-black focus:!bg-black cursor-pointer ${
                                        bannerMode === option.value ? 'text-primary hover:!text-primary' : 'hover:!text-white'
                                    }`}>
                                    {option.label}
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Settings;