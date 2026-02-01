import { Prisma } from "@prisma/client";
import { CalendarPlus2, Globe } from "lucide-react";
import React from "react";

type CommunityWithJoinedByUsers = Prisma.CommunityGetPayload<{
	include: { joinedBy: true };
}>;
interface AboutCommunityProps {
	community: CommunityWithJoinedByUsers;
}

const AboutCommunity = ({ community }: AboutCommunityProps) => {
	return (
		<div className="space-y-2 text-sm md:text-base">
			<div>{community.name}</div>
			<div className="dark:text-[#FAFAFA]  text-[#52525B] ">
				{community.description}
			</div>
			<div className=" dark:text-[#FAFAFA]  text-[#52525B] flex items-center gap-2">
				<CalendarPlus2 size={15} />
				Created {`${new Date(community.createdAt).toDateString()}`}
			</div>
			<div className="dark:text-[#FAFAFA]  text-[#52525B] flex items-center gap-2">
				<Globe size={15} />
				Public
			</div>
			<div className="flex items-center gap-2">
				<div className="dark:text-[#FAFAFA]  text-[#52525B]">
					{community?.joinedBy.length}
				</div>
				<div className="dark:text-[#FAFAFA]  text-[#52525B]">
					Members
				</div>
			</div>
		</div>
	);
};

export default AboutCommunity;
