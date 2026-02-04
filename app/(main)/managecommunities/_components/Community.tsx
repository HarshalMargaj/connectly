"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import { useLeaveCommunity } from "@/hooks/useLeaveCommunity";
import { useAuth } from "@clerk/nextjs";

import { playSound } from "@/lib/PlaySound";
import type { Community } from "@prisma/client";
import { Handshake } from "lucide-react";

interface CommunityProps {
	community: Community;
	data: Community[];
}

const Community = ({ community, data }: CommunityProps) => {
	const isJoined = data.find(c => c.id === community.id);
	const { userId } = useAuth();

	if (!userId) return null;

	const { mutateAsync: leaveCommunityMutation } = useLeaveCommunity({
		userId,
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
						leaveCommunityMutation({
							communityId: community.id,
							communityName: community.name,
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
