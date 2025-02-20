import Landing from "@/components/page/landing";

export default async function Home() {
    return (
        <div className="flex flex-col justify-center items-center gap-4 p-2">
            Image Gallery
            <Landing />
        </div>
    );
}
