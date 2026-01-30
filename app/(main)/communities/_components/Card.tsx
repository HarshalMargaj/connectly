import { Prisma } from "@prisma/client";
import { Handshake } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type CommunityWithJoinedByUsers = Prisma.CommunityGetPayload<{
	include: { joinedBy: true };
}>;
interface CardProps {
	community: CommunityWithJoinedByUsers;
}

const Card = ({ community }: CardProps) => {
	const router = useRouter();

	console.log("community form card", community.slug);

	return (
		<div
			onClick={() => router.push(`/community/${community.slug}`)}
			className="border dark:border-[#27272A] p-4 rounded-md h-[80px] flex items-center gap-2 w-full dark:bg-[#141416] cursor-pointer"
		>
			<div className="border dark:border-[#27272A] rounded-full p-2 shadow-sm shadow-amber-100/10">
				<Handshake className="dark:text-white text-[#18181B]" />
			</div>
			<div className="w-[80%]">
				<div className="cursor-pointer text-sm">{community.name}</div>
				<div className="text-sm dark:text-[#A1A1AA] text-[#52525B] truncate w-full">
					{community.description}
				</div>
				<div className="text-sm dark:text-[#A1A1AA] text-[#52525B]">
					{community?.joinedBy.length} Members
				</div>
			</div>
		</div>
	);
};

export default Card;
