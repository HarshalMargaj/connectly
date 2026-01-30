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
					? "bg-neutral-100 dark:text-[#8B5CF6] dark:bg-[#8B5CF6]/15 text-[#18181B]"
					: "dark:hover:bg-[#8B5CF6]/10 dark:text-white "
			} p-2 rounded-md cursor-pointer`}
		>
			<div className=" border border-neutral-700 rounded-full p-1 shadow-sm shadow-white/10 ">
				<Handshake
					className={`text-[#18181B] ${
						isActive ? "dark:text-[#8B5CF6]" : "dark:text-white"
					}`}
					size={15}
				/>
			</div>

			{community.name}
		</div>
	);
};

export default CommunityItem;
