"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getPostsByUser = async () => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	return await db.post.findMany({
		where: {
			userId: userId,
		},
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
