"use client";

import { getUserJoinedCommunities } from "@/lib/getUserJoinedCommunities";
import { useQuery } from "@tanstack/react-query";

export const useJoinedCommunitiesQuery = ({ userId }: { userId?: string }) => {
	return useQuery({
		queryKey: ["joinedCommunities", userId],
		queryFn: () => getUserJoinedCommunities(userId),
		enabled: !!userId,
		staleTime: 5 * 60 * 1000,
		select: data => data.joinedCommunities,
	});
};
