"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getSavedPosts = async () => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	const user = await db.user.findUnique({
		where: { id: userId },
		include: {
			savedPosts: {
				include: {
					owner: true,
					comments: true,
					PostReaction: true,
					community: true,
				},
			},
		},
	});

	return user?.savedPosts ?? [];
};
