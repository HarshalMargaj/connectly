import React from "react";
import { useRouter } from "next/navigation";
import { Community } from "@prisma/client";
import { Handshake } from "lucide-react";

interface CommunityItemProps {
	community: Community;
	selectedItem: string | undefined;
	setSelectedItem: (communityId: string) => void;
}

const CommunityItem = ({
	community,
	selectedItem,
	setSelectedItem,
}: CommunityItemProps) => {
	const router = useRouter();

	return (
		<div
			onClick={() => {
				router.push(`/community/${community.slug}`);
				setSelectedItem(community.id);
				localStorage.setItem("selectedItem", community.id);
			}}
			key={community.id}
			className={`flex items-center gap-2  ${
				selectedItem === community.id
					? "bg-amber-100 dark:text-neutral-800"
					: "hover:bg-amber-100/10 dark:text-white text-gray-600"
			} p-2 rounded-md cursor-pointer`}
		>
			<div className="border border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10 ">
				<Handshake
					className={`text-neutral-800 ${
						selectedItem === community.id
							? "dark:text-neutral-800"
							: "dark:text-amber-100"
					}`}
					size={15}
				/>
			</div>

			{community.name}
		</div>
	);
};

export default CommunityItem;
