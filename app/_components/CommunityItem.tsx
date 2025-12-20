import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Community } from "@prisma/client";
import { Handshake } from "lucide-react";

interface CommunityItemProps {
	community: Community;
}

const CommunityItem = ({ community }: CommunityItemProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const isActive = pathname === `/community/${community.slug}`;

	return (
		<div
			onClick={() => {
				router.push(`/community/${community.slug}`);
			}}
			key={community.id}
			className={`flex items-center gap-2  ${
				isActive
					? "bg-neutral-100 dark:bg-amber-100 dark:text-neutral-800"
					: "hover:bg-amber-100/10 dark:text-white text-gray-600"
			} p-2 rounded-md cursor-pointer`}
		>
			<div className="border border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10 ">
				<Handshake
					className={`text-neutral-800 ${
						isActive
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
