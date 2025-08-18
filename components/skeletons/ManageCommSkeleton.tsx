// ManageCommunitiesSkeleton.tsx
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CommunitySkeleton = () => {
	return (
		<div className="flex w-full items-center justify-between">
			{/* Left side (icon + name) */}
			<div className="flex items-center gap-2">
				<Skeleton className="h-6 w-6 rounded-full" />
				<Skeleton className="h-5 w-32" />
			</div>

			{/* Right side (button) */}
			<Skeleton className="h-8 w-16 rounded-md" />
		</div>
	);
};

const ManageCommunitiesSkeleton = () => {
	return (
		<div className="p-5 space-y-4">
			{/* Title */}
			<Skeleton className="h-8 w-64" />

			{/* Search bar */}
			<Skeleton className="h-10 w-full rounded-md" />

			{/* Community list (5 items) */}
			<div className="space-y-4">
				{Array.from({ length: 5 }).map((_, i) => (
					<CommunitySkeleton key={i} />
				))}
			</div>
		</div>
	);
};

export default ManageCommunitiesSkeleton;
