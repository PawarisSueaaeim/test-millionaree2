import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
		formats: ['image/avif', 'image/webp'],
        remotePatterns: [
			{
				protocol: 'https',
				hostname: 'unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos'
			}
        ],
    },
};

export default nextConfig;
