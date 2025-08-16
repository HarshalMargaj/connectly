import React from "react";
import { Community, Prisma } from "@prisma/client";
import { Handshake } from "lucide-react";
import { useRouter } from "next/navigation";

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
			className="border border-neutral-700 p-4 rounded-md h-[80px] flex items-center gap-2 w-full"
		>
			<div className="border border-neutral-700 rounded-full p-2 shadow-sm shadow-amber-100/10">
				<Handshake className="text-amber-100" />
			</div>
			<div className="w-[80%]">
				<div className="cursor-pointer text-sm">{community.name}</div>
				<div className="text-sm text-neutral-600 truncate w-full">
					{community.description}
				</div>
				<div className="text-sm text-neutral-600">
					{community?.joinedBy.length} Members
				</div>
			</div>
		</div>
	);
};

export default Card;
