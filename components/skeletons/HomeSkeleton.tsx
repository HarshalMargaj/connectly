import { Skeleton } from "@/components/ui/skeleton";

const HomeSkeleton = () => {
	return (
		<div className="border border-neutral-900 p-5 rounded-md space-y-4 max-h-[600px] overflow-hidden">
			{/* Header */}
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-2">
					<Skeleton className="w-6 h-6 rounded-full" />
					<Skeleton className="w-24 h-4" />
				</div>
				<Skeleton className="w-28 h-3 ml-2" />
			</div>

			{/* Title */}
			<Skeleton className="w-3/4 h-5" />

			{/* Description */}
			<div className="space-y-2">
				<Skeleton className="w-full h-4" />
				<Skeleton className="w-5/6 h-4" />
			</div>

			{/* Actions */}
			<div className="flex items-center gap-4">
				<Skeleton className="w-16 h-6 rounded-md" />
				<Skeleton className="w-16 h-6 rounded-md" />
				<Skeleton className="w-10 h-6 rounded-md" />
			</div>
		</div>
	);
};

export default HomeSkeleton;
