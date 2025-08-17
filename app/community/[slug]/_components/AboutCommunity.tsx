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
		<div className="space-y-2">
			<div>{community.name}</div>
			<div className="text-neutral-400">{community.description}</div>
			<div className=" text-neutral-400 flex items-center gap-2">
				<CalendarPlus2 size={15} />
				Created {`${community.createdAt.toDateString()}`}
			</div>
			<div className="text-neutral-400 flex items-center gap-2">
				<Globe size={15} />
				Public
			</div>
			<div className="flex items-center gap-2">
				<div>{community?.joinedBy.length}</div>
				<div className="text-neutral-400">Members</div>
			</div>
		</div>
	);
};

export default AboutCommunity;
