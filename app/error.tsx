"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
}) {
    console.log(error);

    return (
        <html>
            <body>
                <div className="flex flex-col justify-center items-center h-screen gap-10">
                    <div className="font-bold text-red-500 text-2xl">Error</div>
                    <div className="font-normal text-red-500 text-xl">{error.message}</div>
                    <div></div>
                    <Link href={"/"}>
                        <Button>Try again</Button>
                    </Link>
                </div>
            </body>
        </html>
    );
}
