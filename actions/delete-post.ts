"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const deletePost = async (id: string) => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		return redirectToSignIn();
	}

	await db.post.delete({
		where: {
			id,
			userId,
		},
	});
};
