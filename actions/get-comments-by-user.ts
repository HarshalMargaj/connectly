"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getCommentsByUser = async () => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		return redirectToSignIn();
	}

	const user = await db.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			Comment: {
				include: {
					author: true,
					post: {
						include: {
							community: true,
						},
					},
				},
			},
		},
	});

	return user?.Comment ?? [];
};
