'use client'

// ** React
import {useState} from "react";

// ** Shadcn ui
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input";

// ** Components
import Button from "@/components/common/Button";

// ** Icons
import {UserRoundX} from "lucide-react";

// ** Hooks
import {useDeleteAccount} from "@/hooks/user/useDeleteAccount";


type TDialogDeleteAccount = {
    userName: string
}

const DialogDeleteAccount = ({userName}: TDialogDeleteAccount) => {

    const [confirm, setConfirm] = useState("")
    const [open, setOpen] = useState(false)
    const {trigger, isMutating} = useDeleteAccount()

    const handleDelete = async () => {
        await trigger()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleDelete}>
            <DialogTrigger asChild>
                <Button size='icon-sm' variant='destructive'>
                    <UserRoundX/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Xoá tài khoản cá nhân</DialogTitle>
                    <DialogDescription>
                        Hành động này không thể hoàn tác. Tài khoản của bạn sẽ bị xoá vĩnh viễn.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Vui lòng nhập <span className="font-bold text-destructive">{userName}</span> để xác nhận xoá
                        tài khoản.
                    </p>
                    <Input
                        placeholder={`Nhập "${userName}" để xác nhận`}
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Huỷ</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        isLoading={isMutating}
                        onClick={handleDelete}
                    >
                        Xoá tài khoản
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogDeleteAccount;