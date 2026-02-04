"use client";

import { leaveCommunity } from "@/lib/leaveCommunity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type leaveCommunityVars = {
	communityId: string;
	communityName: string;
};

export const useLeaveCommunity = ({ userId }: { userId?: string }) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ communityId }: leaveCommunityVars) =>
			leaveCommunity(communityId),
		onSuccess: (_, variables) => {
			toast.success(
				`You’re no longer a member of ${variables.communityName}`,
			);
			queryClient.invalidateQueries({
				queryKey: ["joinedCommunities", userId],
			});
		},
		onError: (error: Error) => {
			toast.error(error.message);
		},
	});
};
