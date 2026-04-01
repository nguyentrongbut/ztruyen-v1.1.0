// ** React
import {ReactNode} from "react";

// ** lib
import {cn} from "@/lib/utils";

type TOverlay = {
    children: ReactNode;
    isOverlayOpen: boolean;
    onClose: () => void;
}

const Overlay = ({
                     children,
                     isOverlayOpen,
                     onClose
                 }: TOverlay) => {
    return (
        <div
            className={cn(
                'fixed inset-0 bg-white/5 transition-opacity duration-500 ease-in-out',
                isOverlayOpen
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
            )}
            onClick={onClose}
        >
            {children}
        </div>
    );
};

export default Overlay;
