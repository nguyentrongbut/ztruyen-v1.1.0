// ** Component
import ErrorText from "@/components/common/ErrorText";

// ** Module component
import GridCarouselClient from "@/modules/home/GridCarouselClient";

// ** Service
import {getListHome} from "@/services/api-otruyen/home";

const GridCarousel = async () => {

    const res = await getListHome();

    const listHome = res.data?.items;

    if(!listHome) return <ErrorText/>;

    return (
        <GridCarouselClient data={listHome} />
    )
}

export default GridCarousel