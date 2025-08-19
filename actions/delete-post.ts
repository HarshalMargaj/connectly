"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const deletePost = async (id: string) => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	await db.post.delete({
		where: {
			id,
			userId,
		},
	});
};
