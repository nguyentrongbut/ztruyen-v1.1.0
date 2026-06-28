// ** Components
import RankingPageClient from "./RankingPageClient";

// ** Utils
import removeExtension from "@/utils/removeExtension";

type TRankingPage = {
    params: Promise<{ country: string }>
}

const RankingPage = async ({params}: TRankingPage) => {
    const {country} = await params

    const countryComic = removeExtension(country, '.html')

    return <RankingPageClient countryComic={countryComic}/>
}

export default RankingPage