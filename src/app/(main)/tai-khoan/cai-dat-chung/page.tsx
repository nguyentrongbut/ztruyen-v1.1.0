// ** Next
import type {Metadata} from "next";

// ** Module
import UserSetting from "@/modules/tai-khoan/cai-dat-chung/UserSetting";

export const metadata: Metadata = {
    title: "Ảnh đại diện tài khoản",
    description: "Thay đổi ảnh đại diện tài khoản của bạn",
}

const UserSettingsPage = () => {
    return (
        <>
            <h1 className='heading'>Cài đặt chung</h1>
            <UserSetting/>
        </>
    )
}

export default UserSettingsPage