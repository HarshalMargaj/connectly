"use server";

import { db } from "@/lib/db";

export const getPostsById = async (communityId: string) => {
	return await db.post.findMany({
		where: { communityId },
		include: {
			owner: true,
			comments: true,
			PostReaction: true,
			community: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};
