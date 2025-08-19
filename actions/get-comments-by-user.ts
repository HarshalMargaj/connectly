"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getCommentsByUser = async () => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
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
