import { Skeleton } from "@/components/ui/skeleton";

const CommentCardSkeleton = () => {
	return (
		<div className="border dark:border-neutral-900 rounded-md p-4 space-y-2">
			{/* Top row */}
			<div className="flex items-start gap-2">
				{/* Icon placeholder */}
				<div className="border dark:border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
					<Skeleton className="h-6 w-6 rounded-full" />
				</div>

				{/* Community + Author */}
				<div className="flex items-start gap-2">
					<div className="text-sm space-y-1">
						<Skeleton className="h-4 w-32" /> {/* community name */}
						<Skeleton className="h-3 w-24" /> {/* author */}
					</div>
					<div className="flex items-center gap-2 ml-auto">
						<Skeleton className="h-3 w-3 rounded-full" />
						<Skeleton className="h-3 w-28" />
					</div>
				</div>

				{/* Dot + Post title */}
			</div>

			{/* Comment content */}
			<div className="space-y-2">
				<Skeleton className="h-3 w-full" />
				<Skeleton className="h-3 w-5/6" />
			</div>
		</div>
	);
};

export default CommentCardSkeleton;
