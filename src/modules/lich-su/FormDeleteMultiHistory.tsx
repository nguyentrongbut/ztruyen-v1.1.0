'use client'

// ** Shadcn ui
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

// ** Component
import Button from "@/components/common/Button";

// ** Icon
import {Trash} from "lucide-react";

// ** React hot toast
import toast from "react-hot-toast";

// ** Local Storage
import {historyService, IHistoryStorage} from "@/localStorage/historyServices";

// ** Types
import {IHistory} from "@/types/api";

type TFormDeleteMultiHistory = {
    listHistory: IHistory[] | IHistoryStorage[];
    deleteMulti: boolean;
    setDeleteMulti: (value: boolean) => void;
    selected: string[];
    setSelected: (ids: string[]) => void;
    onRefresh: () => void;
}

const FormDeleteMultiHistory = (
    {
        deleteMulti, setDeleteMulti, selected, setSelected, listHistory, onRefresh
    }: TFormDeleteMultiHistory) => {

    const handleDeleteMultiple = () => {
        if (selected.length > 0) {
            historyService.deleteMany(selected)
            onRefresh()
            toast.success("Meow~ Tất cả đã biến mất như phép màu ")
            setDeleteMulti(false)
            setSelected([])
        } else {
            toast.error('Hãy chọn ít nhất 1 truyện nhé...')
        }
    }

    const handleSelectAll = () => {
        if (selected.length === listHistory.length) {
            setSelected([])
        } else {
            setSelected(listHistory.map((item) => item.chapter_id))
        }
    }

    if (deleteMulti) return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        sizeCustom='xs'
                        variant='ghost'
                        className="text-red-600 dark:text-red-400 hover:text-red-600"
                        disabled={selected.length === 0}
                    >
                        <Trash className="size-3 sm:size-4"/>
                        Xác nhận xoá
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Meoow… Bạn chắc chắn muốn xóa hết đống truyện chưa đọc hết này hả? (=^･ω･^=)
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Xóa là biến mất vĩnh viễn khỏi thư viện của bạn luôn nha… ~ (≧ᆺ≦)
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant='outline'>
                            Thôi, tớ đổi ý rồi~ (ฅ^ω^ฅ)
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteMultiple} variant='destructive'>
                            Đúng vậy! (=^･ｪ･^=)/
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Selected/unSelected all Btn */}
            <Button
                sizeCustom='xs'
                variant='ghost'
                onClick={handleSelectAll}
                className={`${selected.length === listHistory.length ? 'text-black/80 dark:text-white/80 hover:opacity-80' : 'text-primary opacity-80'}`}
            >
                {selected.length === listHistory.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
            </Button>

            {/* Cancel Btn */}
            <Button
                sizeCustom='xs'
                variant='ghost'
                onClick={() => {
                    setDeleteMulti(false)
                    setSelected([])
                }}
            >
                Huỷ
            </Button>
        </>
    )

    return (
        <Button
            sizeCustom='xs'
            variant='ghost'
            className="text-red-600 dark:text-red-400 hover:text-red-600"
            onClick={() => setDeleteMulti(true)}
        >
            <Trash className="size-3 sm:size-4"/>
            Xoá nhiều truyện
        </Button>
    )
}

export default FormDeleteMultiHistory