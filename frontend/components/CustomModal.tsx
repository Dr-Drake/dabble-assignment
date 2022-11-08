import React from 'react';

export interface CustomModalProps{
    show?: boolean;
    children?: React.ReactNode;
    onClose?: ()=> void;
}

const CustomModal: React.FC<CustomModalProps> = ({
    show = true, children, onClose
})=>{

    // Classes
    let backdrop = 'fixed top-0 left-0 w-full z-50 h-full bg-backdrop flex items-center justify-center';

    return(
        <div className={`${backdrop} ${show ? 'block' : 'hidden'}`} onClick={onClose}>
            { children }
        </div>
    )
}

export default CustomModal;