"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const unsavePost = async (postId: string) => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		return redirectToSignIn();
	}

	await db.user.update({
		where: {
			id: userId,
		},
		data: {
			savedPosts: {
				disconnect: { id: postId },
			},
		},
	});
};
