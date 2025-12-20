"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className="h-full  flex items-center justify-center flex-col text-center gap-4 relative select-none">
			<div className="absolute inset-0 h-full w-full dark:bg-black -z-10">
				<div className="absolute top-0 z-[-2] h-screen w-screen dark:bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			</div>
			<div className="flex items-center gap-2 absolute top-10 left-10">
				<Image
					src="/favicon.png"
					alt="app-logo"
					width={32}
					height={32}
					className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
				/>
				<div className="md:text-2xl text-md font-semibold dark:text-amber-100 text-neutral-900">
					Connectly
				</div>
			</div>
			<div className="text-white flex flex-col items-center justify-center gap-4">
				<div className="lg:text-7xl text-3xl md:text-6xl  dark:text-amber-100 text-neutral-900">
					Connect. Share. Grow.
				</div>
				<div className="lg:w-[60%] md:w-[80%] w-full px-5 md:px-0 dark:text-amber-50/50 text-neutral-400">
					Discover communities built around your interests. Join
					conversations, share ideas, and be part of something
					meaningful.
				</div>
			</div>
			<Button
				onClick={() => router.push("/home")}
				variant="outline"
				className="bg-black text-white dark:bg-amber-100"
			>
				Explore Connectly
			</Button>
		</div>
	);
}
