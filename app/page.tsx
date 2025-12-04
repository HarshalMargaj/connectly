"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	return (
		<div className="h-full  flex items-center justify-center flex-col text-center gap-4 relative select-none">
			<div className="absolute inset-0 h-full w-full bg-black -z-10">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
				<div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
			</div>
			<div className="flex items-center gap-2 absolute top-10 left-10">
				<Image
					src="/favicon.png"
					alt="app-logo"
					width={32}
					height={32}
				/>

				<div className="text-2xl font-semibold text-amber-100">
					Connectly
				</div>
			</div>
			<div className="text-white flex flex-col items-center justify-center gap-4">
				<div className="text-7xl text-amber-100">
					Connect. Share. Grow.
				</div>
				<div className="w-[60%] text-amber-50/50">
					Discover communities built around your interests. Join
					conversations, share ideas, and be part of something
					meaningful.
				</div>
			</div>
			<Button
				onClick={() => router.push("/home")}
				variant="outline"
				className="bg-amber-100 dark:bg-amber-100"
			>
				Explore Connectly
			</Button>
		</div>
	);
}
