'use client'

// ** Hooks
import {useAuth} from "@/hooks/common/useAuth";

// ** Icons
import {Bell, MessageCircle} from "lucide-react";

// ** Shadcn ui
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// ** Skeleton
import ButtonSkeleton from "@/skeletons/layouts/ButtonSkeleton";

// ** Component
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const Notification = () => {

    const {isLogin, loading} = useAuth();

    if (loading) return <ButtonSkeleton/>;

    return (
        <div className='ml-1'>
            {isLogin && (

                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <div className="relative p-2.5 cursor-pointer rounded-xl">

                            <Bell className="size-4"/>



                            <span className="absolute -top-0.5 -right-0.5
                                          min-w-4 h-4 px-[3px]
                                          bg-red-500 dark:bg-amber-400/15 dark:text-amber-400 dark:border-amber-400/25
                                          text-white text-[10px] font-semibold
                                          rounded-full flex items-center justify-center
                                          ring-2 ring-background shadow-sm shadow-red-500/50 dark:shadow-amber-400/10
                                          animate-badge">
                              3
                            </span>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-90" align="center">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className='font-bold my-2'>
                                Thông báo
                            </DropdownMenuLabel>

                            <DropdownMenuItem>
                                <div className='flex gap-3 items-center py-2'>
                                    <div className='relative flex-shrink-0'>
                                        <Avatar className='size-14'>
                                            <AvatarImage src={''} alt='avatar'/>
                                            <AvatarFallback>
                                                <div>T</div>
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className='absolute -bottom-1 -right-1 rounded-full size-6 bg-primary flex justify-center items-center'>
                                            <MessageCircle className='size-3 text-white fill-white'/>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='line-clamp-2'>
                                            <span className='text-sm font-medium mr-2'>Nguyễn Văn A</span>
                                            <span className='text-xs text-muted-foreground'>Đã phản hồi về bình luận của bạn tại truyện "One Piece": hay vãi</span>
                                        </p>
                                        <div className='text-primary text-xs mt-1'>2 giờ trước</div>
                                    </div>
                                    <div className='rounded-full size-2 bg-primary flex-shrink-0'/>
                                </div>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <div className='flex gap-3 items-center py-2'>
                                    <div className='relative flex-shrink-0'>
                                        <Avatar className='size-14'>
                                            <AvatarImage src={''} alt='avatar'/>
                                            <AvatarFallback>
                                                <div>T</div>
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className='absolute -bottom-1 -right-1 rounded-full size-6 bg-primary flex justify-center items-center'>
                                            <MessageCircle className='size-3 text-white fill-white'/>
                                        </div>
                                    </div>
                                    <div className='opacity-60'>
                                        <p className='line-clamp-2'>
                                            <span className='text-sm font-medium mr-2'>Nguyễn Văn A</span>
                                            <span className='text-xs text-muted-foreground'>Đã phản hồi về bình luận của bạn tại truyện "One Piece": hay vãi</span>
                                        </p>
                                        <div className='text-xs mt-1'>2 giờ trước</div>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default Notification