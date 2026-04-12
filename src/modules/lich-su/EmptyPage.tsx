// ** Next
import Image from 'next/image';
import Link from 'next/link';

// ** Components
import Button from "@/components/common/Button";

// ** Configs
import {CONFIG_IMAGE} from "@/configs/image";
import {CONFIG_SLUG} from "@/configs/slug";

// ** Enum
import {ESlug} from "@/types/enum";
import {CONFIG_IMG} from "@/configs/img";

const EmptyPage = () => {
    return (
        <div className="flex flex-col gap-4 justify-center items-center">

            <div className="relative size-[300px]">
                <Image
                    src={CONFIG_IMG.EMPTY}
                    alt="Ảnh không tìm thấy lịch sử đọc truyện tại Ztruyện - ztruyen.io.vn"
                    fill
                    placeholder={CONFIG_IMAGE.BLUR_DATA_URL as 'data:image/'}
                    className="hover:scale-105 transition-transform filter-img"
                />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-center">
                (¬‿¬) Bắt quả tang nha! Bạn chưa đọc truyện nào ở Ztruyện
            </h2>
            <p className="text-xs sm:text-sm mt-2 max-w-md text-center">
                Chưa đọc truyện nào hết! Chọn một bộ bất kỳ để bắt đầu,
                tụi mình sẽ ghi nhớ giúp bạn để lần sau đọc tiếp nha
            </p>
            <Link href={`/${CONFIG_SLUG.LIST}/${ESlug.NEW}.html`}>
                <Button sizeCustom='xs'>
                    (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ Đi tìm truyện thôi!
                </Button>
            </Link>
        </div>
    );
};

export default EmptyPage;