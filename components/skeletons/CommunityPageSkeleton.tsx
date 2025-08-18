"use client";

import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
	return (
		<div className="border border-neutral-900 p-5 rounded-md space-y-4 max-h-[600px] overflow-hidden">
			{/* Top Row: User + Date */}
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-2">
					<Skeleton className="w-[25px] h-[25px] rounded-full" />
					<Skeleton className="w-20 h-4" />
				</div>
				<Skeleton className="w-28 h-3 ml-2" />
			</div>

			{/* Title */}
			<Skeleton className="w-3/4 h-6" />

			{/* Description */}
			<Skeleton className="w-full h-4" />
			<Skeleton className="w-5/6 h-4" />

			{/* Reactions */}
			<div className="flex items-center gap-4">
				<Skeleton className="w-16 h-6" />
				<Skeleton className="w-16 h-6" />
				<Skeleton className="w-10 h-6" />
			</div>
		</div>
	);
};

const AboutCommunitySkeleton = () => {
	return (
		<div className="border p-4 rounded-md bg-neutral-900 space-y-3">
			<Skeleton className="w-40 h-6" /> {/* Name */}
			<Skeleton className="w-full h-4" /> {/* Description */}
			<Skeleton className="w-2/3 h-4" /> {/* Created */}
			<Skeleton className="w-20 h-4" /> {/* Public */}
			<div className="flex items-center gap-2">
				<Skeleton className="w-6 h-6 rounded-full" />
				<Skeleton className="w-16 h-4" />
			</div>
		</div>
	);
};

const CommunityPageSkeleton = () => {
	return (
		<div className="relative">
			{/* Banner */}
			<div className="h-[200px] w-full overflow-hidden">
				<Skeleton className="h-full w-full" />
			</div>

			{/* Header (logo + name) */}
			<div className="flex items-center absolute top-25 p-5">
				<div className="flex items-end gap-4 ">
					<div className="border border-neutral-700 rounded-full p-4 shadow-sm shadow-amber-100/10 bg-neutral-800 flex items-center justify-center">
						<Skeleton className="w-[100px] h-[100px] rounded-full" />
					</div>
					<Skeleton className="w-40 h-8" />
				</div>
			</div>

			{/* Buttons */}
			<div className="flex items-center justify-end p-5 gap-2">
				<Skeleton className="w-32 h-9 rounded-3xl" />
				<Skeleton className="w-24 h-9 rounded-3xl" />
			</div>

			{/* Content Section */}
			<div className="p-5 pb-20 flex gap-4 items-start">
				{/* Posts */}

				<div className="w-[70%] space-y-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<PostCardSkeleton key={i} />
					))}
				</div>

				{/* Sidebar */}
				<div
					className={`
						
					w-[30%] sticky top-0`}
				>
					<AboutCommunitySkeleton />
				</div>
			</div>
		</div>
	);
};

export default CommunityPageSkeleton;
