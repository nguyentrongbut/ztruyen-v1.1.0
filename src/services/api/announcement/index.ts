'use client'

// ** lib
import {fetcher} from "@/lib/fetcher";

// ** Configs
import {CONFIG_API} from "@/configs/api";

// ** Type
import {IAnnouncement} from "@/types/api";

export const AnnouncementService = {
    active: (): Promise<IApiRes<IAnnouncement>> => {
        return fetcher<IApiRes<IAnnouncement>>(CONFIG_API.ANNOUNCEMENT.ACTIVE)
    }
}