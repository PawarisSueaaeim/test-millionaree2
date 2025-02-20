'use client';
import React, { useEffect } from 'react';

type Props = {
    open: boolean;
    close: () => void;
    children?: React.ReactNode;
};

export default function Popup({ open, close, children }: Props) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors ${
                open ? ' visible bg-black/50' : 'invisible'
            }`}
            onClick={close}
        >
            <div
                className={`p-4 md:p-20 lg:p-40 transition-all ${
                    open ? 'scale-100 opacity-100 duration-200' : 'scale-50 opacity-0 duration-200'
                }`}
            >
                {children}
            </div>
        </div>
    );
}
