// ** React hot toast
import {Toaster} from 'react-hot-toast';

const Toast = () => {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                className:
                    '!max-w-none !bg-primary !text-white px-4 py-2 font-ui !flex-nowrap',
                duration: 2000,

                success: {
                    className: '!max-w-none !text-xs !bg-primary !text-white font-ui !items-center',
                    iconTheme: {
                        primary: 'white',
                        secondary: 'transparent',
                    },
                    icon: <span className="shrink-0">(=^･ｪ･^=)/</span>,
                },

                error: {
                    className: '!max-w-none !text-xs !bg-red-400 !text-white font-ui !items-center',
                    icon: <span className="shrink-0">(=ＴェＴ=)</span>,
                },
            }}
        />
    )
}

export default Toast;