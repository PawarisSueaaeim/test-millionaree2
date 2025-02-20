'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Card from '../ui/card';
import Loading from '../ui/loading';
import Modal from '../ui/modal';
import Popup from '../ui/popup';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_PHOTO_API;

export type IlistData = {
    author: string;
    download_url: string;
    height: number;
    id: string;
    url: string;
    width: number;
};

export default function Landing() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pageParams = searchParams.get('page');
    const limitParams = searchParams.get('limit');

    const [lists, setList] = useState<IlistData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(
        pageParams ? Number(pageParams) : 1
    );
    const [limit, setLimit] = useState<number>(
        limitParams ? Number(limitParams) : 9
    );

    const [imageUrl, setImageUrl] = useState<string>('');
    const [height, setHeight] = useState<number | null>(null);
    const [width, setWidth] = useState<number | null>(null);
    const [author, setAuthor] = useState<string>('');
    const [download, setDownload] = useState<string>('');

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleOnClickOpenModal = ({
        url,
        author,
        download_url,
        height,
        width,
    }: IlistData) => {
        setIsOpenModal(true);
        setImageUrl(url);
        setAuthor(author);
        setDownload(download_url);
        setHeight(height);
        setWidth(width);
    };

    const handleOnCloseModal = (value: boolean) => {
        setIsOpenModal(value);
    };

    useEffect(() => {
        const getList = async () => {
            try {
                setLoading(true);
                router.push(`/?page=${page}&limit=${limit}`, { scroll: false });
                const response = await axios.get(
                    `${baseURL}v2/list?page=${page}&limit=${limit}`
                );
                if (response?.status === 200) {
                    setList((prevImg) => [...prevImg, ...response?.data]);
                } else {
                    Swal.fire({
                        icon: 'info',
                        title: `Image list page ${page} found`,
                        confirmButtonText: 'OK',
                    });
                }
            } catch (error: any) {
                router.push(
                    `/error?message=${error.message}&response=${error.response?.data}`
                );
            } finally {
                setLoading(false);
            }
        };
        getList();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                    document.documentElement.scrollHeight - 100 &&
                !loading
            ) {
                setTimeout(() => {
                    setPage(page + 1);
                }, 500);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lists?.map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="flex justify-center items-center"
                    >
                        <Card
                            image={item.download_url}
                            author={item.author}
                            height={item.height}
                            width={item.width}
                            onClick={() =>
                                handleOnClickOpenModal({
                                    id: item.id,
                                    url: item.url,
                                    author: item.author,
                                    download_url: item.download_url,
                                    height: item.height,
                                    width: item.width,
                                })
                            }
                        />
                    </div>
                ))}
                {loading && (
                    <div
                        className={`grid col-span-1 md:col-span-2 lg:col-span-3 h-10 p-10 top-0`}
                    >
                        <Loading />
                    </div>
                )}
            </div>
            <Popup close={() => handleOnCloseModal(false)} open={isOpenModal}>
                <Modal
                    image={imageUrl}
                    author={author}
                    height={height}
                    width={width}
                    download={download}
                    onStopAction={(e) => e.stopPropagation()}
                    onClick={(value) => handleOnCloseModal(value)}
                />
            </Popup>
        </>
    );
}
