import Image from 'next/image';
import React from 'react';
import { Button } from './button';
import { IoIosClose } from 'react-icons/io';

type Props = {
    image: string;
    height: number | null;
    width: number | null;
    download: string | '';
    author: string;
    onStopAction: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClick: (value: boolean) => void;
};

export default function Modal({
    image,
    height,
    width,
    download,
    author,
    onStopAction,
    onClick,
}: Props) {
    const isPlaceholder = !image || image === '/pic/no-image.png';

    const handleDownload = async () => {
        if (!download) return;

        try {
            const response = await fetch(download);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${author}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    return (
        <div onClick={onStopAction}>
            <div className="relative w-full">
                <div className="relative w-full flex justify-center items-center bg-black rounded-t-lg overflow-hidden">
                    <IoIosClose
                        className="absolute top-5 right-5 text-white text-3xl hover:scale-125 hover:text-gray-400 duration-300"
                        onClick={() => onClick(false)}
                    />
                    <a href={download} target="_blank">
                        <Image
                            className="object-contain max-h-[550px]"
                            src={isPlaceholder ? '/pic/no-image.png' : download}
                            layout="intrinsic"
                            width={isPlaceholder ? 300 : width ?? 500}
                            height={isPlaceholder ? 300 : height ?? 500}
                            alt={author}
                        />
                    </a>
                </div>
            </div>
            <div className="p-5 bg-white w-full rounded-b-lg">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {author}
                </h5>
                <p className="mb-3 font-normal text-gray-700">
                    Original size: {width} x {height}
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => handleDownload()}>Download</Button>
                    <a
                        href={image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                        View Original
                    </a>
                </div>
            </div>
        </div>
    );
}
