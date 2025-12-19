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
			className="border dark:border-neutral-700 p-4 rounded-md h-[80px] flex items-center gap-2 w-full md:w-[300px]"
		>
			<div className="border dark:border-neutral-700 rounded-full p-2 shadow-sm shadow-amber-100/10">
				<Handshake className="dark:text-amber-100 text-gray-600" />
			</div>
			<div className="w-[80%]">
				<div className="cursor-pointer text-sm">{community.name}</div>
				<div className="text-sm dark:text-neutral-600 text-gray-500 truncate w-full">
					{community.description}
				</div>
				<div className="text-sm dark:text-neutral-600 text-gray-500">
					{community?.joinedBy.length} Members
				</div>
			</div>
		</div>
	);
};

export default Card;
