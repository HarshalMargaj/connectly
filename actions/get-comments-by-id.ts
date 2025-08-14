"use server";

import { db } from "@/lib/db";

export const getCommentsById = async (postId: string) => {
	return await db.comment.findMany({
		where: { postId },
		include: {
			author: true,
		},
	});
};
