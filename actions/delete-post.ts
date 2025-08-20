"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const deletePost = async (id: string) => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		return redirectToSignIn();
	}

	// 1. Delete reactions
	await db.postReaction.deleteMany({
		where: { postId: id },
	});

	// 2. Delete comments
	await db.comment.deleteMany({
		where: { postId: id },
	});

	// 3. Delete the post
	await db.post.delete({
		where: {
			id,
			userId,
		},
	});
};
