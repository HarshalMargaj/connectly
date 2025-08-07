import React from "react";
import { Community } from "@prisma/client";
import { Handshake } from "lucide-react";
import { useRouter } from "next/navigation";

interface CardProps {
	community: Community;
}

const Card = ({ community }: CardProps) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/community/${community.id}`)}
			className="border border-neutral-700 p-4 rounded-md max-h-[80px] flex items-center gap-2"
		>
			<div className="border border-neutral-700 rounded-full p-2 shadow-sm shadow-amber-100/10">
				<Handshake className="text-amber-100" />
			</div>
			<div>
				<div className="cursor-pointer hover:border-b hover:border-neutral-700 text-sm">
					{community.name}
				</div>
				<div className="text-sm text-neutral-600 line-clamp-1 truncate">
					{community.description}
				</div>
				<div className="text-sm text-neutral-600">0 Members</div>
			</div>
		</div>
	);
};

export default Card;
