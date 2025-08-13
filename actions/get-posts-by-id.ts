"use server";

import { db } from "@/lib/db";

export const getPostsById = async (communityId: string) => {
	return await db.post.findMany({
		where: { communityId },
		include: {
			owner: true,
		},
	});
};
