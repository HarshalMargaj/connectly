import { Skeleton } from "@/components/ui/skeleton";

const CommunityCardSkeleton = () => {
	return (
		<div className="border dark:border-neutral-700 p-4 rounded-md h-[80px] flex items-center gap-2 w-[260px]">
			<div className="border dark:border-neutral-700 rounded-full p-2 shadow-sm shadow-amber-100/10">
				<Skeleton className="w-6 h-6 rounded-full" />
			</div>

			<div className="w-[80%] space-y-2">
				<Skeleton className="w-32 h-4" />
				<Skeleton className="w-full h-3" />
				<Skeleton className="w-20 h-3" />
			</div>
		</div>
	);
};

export default CommunityCardSkeleton;
