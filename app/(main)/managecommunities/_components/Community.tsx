"use client";

import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/PlaySound";
import { useAuth } from "@clerk/nextjs";
import type { Community } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface CommunityProps {
	community: Community;
	data: Community[];
}

const Community = ({ community, data }: CommunityProps) => {
	const isJoined = data.find(c => c.id === community.id);
	const queryClient = useQueryClient();
	const { userId } = useAuth();

	const leaveCommunity = async ({ communityId }: { communityId: string }) => {
		const res = await fetch(`/api/communities/${communityId}/leave`, {
			method: "DELETE",
		});

		if (!res.ok) {
			toast.error("Failed to leave community");
		}

		return res.json();
	};

	const { mutateAsync: leaveCommunityMutaiton } = useMutation({
		mutationFn: leaveCommunity,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["joinedCommunities", userId],
			});
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
					if (community.id) {
						leaveCommunityMutaiton({
							communityId: community.id,
						});
					}
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
