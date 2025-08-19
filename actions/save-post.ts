"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const savePost = async (postId: string) => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	await db.user.update({
		where: {
			id: userId,
		},
		data: {
			savedPosts: {
				connect: { id: postId },
			},
		},
	});
};
