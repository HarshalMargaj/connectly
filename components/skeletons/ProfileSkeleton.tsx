import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
	return (
		<div className="border border-neutral-900 p-4 rounded-md space-y-2 m-5">
			{/* Header */}
			<div>
				<div className="flex items-start gap-2">
					{/* Icon */}
					<Skeleton className="h-8 w-8 rounded-full border border-neutral-700" />

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
		</div>
	);
};

export default ProfileSkeleton;
