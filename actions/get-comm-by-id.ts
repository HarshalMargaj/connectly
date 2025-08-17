"use server";

import { db } from "@/lib/db";

export const getCommunityById = async (communityId: string) => {
	return await db.community.findFirst({
		where: {
			id: communityId,
		},
	});
};
