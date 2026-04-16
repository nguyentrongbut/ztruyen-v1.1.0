// ** lib
import {fetcher} from "@/lib/fetcher";

// ** Types
import {IDiscordWidget} from "@/types/api";

// ** Configs
import {CONFIG_API} from "@/configs/api";

export const DiscordService = {
    widget: (): Promise<IDiscordWidget> => {
        return fetcher<IDiscordWidget>(CONFIG_API.DISCORD.WIDGET);
    }
};