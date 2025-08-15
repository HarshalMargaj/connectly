"use server";

import { db } from "@/lib/db";

export const getPosts = async () => {
	return await db.post.findMany({
		include: { owner: true, comments: true, PostReaction: true },
		orderBy: {
			createdAt: "desc",
		},
	});
};
