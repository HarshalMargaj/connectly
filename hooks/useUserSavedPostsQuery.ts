"use client";

import { getUserSavedPosts } from "@/lib/getUserSavedPosts";
import { useQuery } from "@tanstack/react-query";

export const useUserSavedPostsQuery = ({ userId }: { userId?: string }) => {
	return useQuery({
		queryFn: () => getUserSavedPosts(userId),
		queryKey: ["savedPosts", userId],
		enabled: !!userId,
		staleTime: 5 * 60 * 1000,
		select: data => data.savedPosts,
	});
};
