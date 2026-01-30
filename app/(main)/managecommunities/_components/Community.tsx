import { leaveCommunity } from "@/actions/leave-community";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/PlaySound";
import type { Community } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import React from "react";

interface CommunityProps {
	community: Community;
	data: Community[];
}

const Community = ({ community, data }: CommunityProps) => {
	const isJoined = data.find(c => c.id === community.id);
	const queryClient = useQueryClient();

	const { mutateAsync: leaveCommunityMutaiton } = useMutation({
		mutationFn: leaveCommunity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["joinedcommunities"] });
			queryClient.invalidateQueries({ queryKey: ["joinedCommunities"] });
		},
		onError: error => {
			console.log(error);
		},
	});

	return (
		<div
			key={community.id}
			className="flex w-full items-center justify-between"
		>
			<div className="flex items-center gap-2">
				<div className="border dark:border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
					<Handshake
						className={` ${"dark:text-white text-[#18181B]"}`}
						size={20}
					/>
				</div>
				<div>{community.name}</div>
			</div>
			<Button
				onClick={() => {
					playSound();
					leaveCommunityMutaiton(community.id);
				}}
				size="sm"
				className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-lg font-medium hover:from-[#7C3AED] hover:to-[#5B21B6] transition hover:text-white"
			>
				{isJoined ? "Leave" : "Join"}
			</Button>
		</div>
	);
};

export default Community;
