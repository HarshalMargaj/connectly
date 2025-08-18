"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getSavedPosts = async () => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		return redirectToSignIn();
	}

	const user = await db.user.findUnique({
		where: { id: userId },
		include: {
			savedPosts: {
				include: {
					owner: true,
				},
			},
		},
	});

	return user?.savedPosts ?? [];
};
