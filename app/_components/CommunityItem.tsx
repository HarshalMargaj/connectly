import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Community } from "@prisma/client";
import { Handshake } from "lucide-react";

interface CommunityItemProps {
	community: Community;
	selectedCommunity: string | undefined;
	setSelectedCommunity: (communityId: string) => void;
}

const CommunityItem = ({
	community,
	selectedCommunity,
	setSelectedCommunity,
}: CommunityItemProps) => {
	const router = useRouter();

	return (
		<div
			onClick={() => {
				router.push(`/community/${community.id}`);
				setSelectedCommunity(community.id);
			}}
			key={community.id}
			className={`flex items-center gap-2 ${
				selectedCommunity === community.id
					? "bg-amber-100 text-neutral-800"
					: "hover:bg-amber-100/10"
			} p-2 rounded-md cursor-pointer`}
		>
			<div className="border border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
				<Handshake
					className={` ${
						selectedCommunity === community.id
							? "text-neutral-800"
							: "text-amber-100"
					}`}
					size={15}
				/>
			</div>
			{community.name}
		</div>
	);
};

export default CommunityItem;
