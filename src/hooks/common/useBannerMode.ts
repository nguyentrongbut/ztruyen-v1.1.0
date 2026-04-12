'use client'

// ** React
import {useEffect, useState} from "react";

// ** Config
import {VARIABLE} from "@/configs/variable";

export type TBannerMode = 'first-last' | 'all' | 'none';

const DEFAULT_MODE: TBannerMode = 'all';

const useBannerMode = () => {
    const [bannerMode, setBannerMode] = useState<TBannerMode | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(VARIABLE.BANNER_MODE) as TBannerMode;
        setBannerMode(
            stored === 'first-last' || stored === 'all' || stored === 'none'
                ? stored
                : DEFAULT_MODE
        );
    }, []);

    const handleBannerMode = (mode: TBannerMode) => {
        setBannerMode(mode);
        localStorage.setItem(VARIABLE.BANNER_MODE, mode);
    };

    return {bannerMode, handleBannerMode};
};

export default useBannerMode;