"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className="h-full  flex items-center justify-center flex-col text-center gap-4 relative select-none">
			<div className="absolute inset-0 h-full w-full dark:bg-black -z-10">
				<div className="absolute top-0 z-[-2] h-screen w-screen dark:bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
			</div>
			<div className="flex items-center gap-2 absolute top-10 left-10">
				<div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-lg flex items-center justify-center text-white font-bold text-xl">
					C
				</div>
				<div className="md:text-2xl text-md font-semibold dark:text-white text-[#18181B] ">
					Connectly
				</div>
			</div>
			<div className="text-white flex flex-col items-center justify-center gap-4">
				<div className="lg:text-7xl text-3xl md:text-6xl text-neutral-900 dark:text-white">
					Connect. Share. Grow.
				</div>
				<div className="lg:w-[60%] md:w-[80%] w-full px-5 md:px-0 dark:text-neutral-200 text-neutral-600 text-lg">
					Discover communities built around your interests. Join
					conversations, share ideas, and be part of something
					meaningful.
				</div>
			</div>
			<Button
				onClick={() => router.push("/home")}
				variant="outline"
				className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-lg font-medium hover:from-[#7C3AED] hover:to-[#5B21B6] hover:text-white transition"
			>
				Explore Connectly
			</Button>
		</div>
	);
}
