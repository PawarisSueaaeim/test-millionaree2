'use client';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
    image: string;
    author: string;
    height: number;
    width: number;
    onClick: () => void;
};

export default function Card({ image, author, height, width, onClick }: Props) {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [imgSrc, setImgSrc] = useState<string>(image);

    return (
        <div
            className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <Image
                className="rounded-lg object-cover"
                src={imgSrc}
                alt={image}
                height={height}
                width={width}
                onError={() => setImgSrc('/pic/no-image.png')}
            />
            <div
                className={`${
                    isHovered ? 'bottom-0' : 'bottom-[-100%]'
                } absolute p-5 rounded-b-lg w-full duration-500 bg-gradient-to-t from-black`}
            >
                <p className="text-white">{author}</p>
            </div>
        </div>
    );
}
