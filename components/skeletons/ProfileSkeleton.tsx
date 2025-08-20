import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
	return (
		<div className="border dark:border-neutral-900 p-4 rounded-md space-y-2 mt-4">
			{/* Header */}
			<div>
				<div className="flex items-start gap-2">
					{/* Icon */}
					<div className="border dark:border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
						<Skeleton className="h-6 w-6 rounded-full" />
					</div>

					{/* Name + Username */}
					<div className="flex gap-2">
						<div className="text-sm space-y-1 flex-1">
							<Skeleton className="h-4 w-28 rounded-md" />
							<Skeleton className="h-3 w-20 rounded-md" />
						</div>
						<Skeleton className="h-3 w-32 rounded-md" />
					</div>

					{/* Date */}
				</div>
			</div>

			{/* Body */}
			<div className="space-y-2">
				<Skeleton className="h-4 w-3/4 rounded-md" />
				<Skeleton className="h-3 w-full rounded-md" />
				<Skeleton className="h-3 w-5/6 rounded-md" />
			</div>
			<div className="flex items-center gap-4">
				<Skeleton className="w-16 h-6" />
				<Skeleton className="w-16 h-6" />
				<Skeleton className="w-10 h-6" />
			</div>
		</div>
	);
};

export default ProfileSkeleton;
