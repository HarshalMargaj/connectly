import React from "react";
import CommunityPage from "./CommunityPage";
import type { Community } from "@prisma/client";
import { db } from "@/lib/db";

interface CommunityProps {
	slug: string;
}

const Community = async ({ slug }: CommunityProps) => {
	const community = await db.community.findUnique({
		where: {
			slug,
		},
		include: {
			joinedBy: true,
			posts: true,
		},
	});

	if (!community) return <div>Community not found</div>;

	return (
		<div>
			<CommunityPage community={community} />
		</div>
	);
};

export default Community;
