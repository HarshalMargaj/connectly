import { Skeleton } from "../ui/skeleton";

export function SkeletonDemo() {
	return (
		<div className="space-y-4">
			<Skeleton className="h-5 w-full" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
		</div>
	);
}
