"use server";

import { db } from "@/lib/db";

export const addComment = async (formData: FormData) => {
	const content = formData.get("content") as string;
	const postId = formData.get("postId") as string;
	const userId = formData.get("userId") as string;

	await db.comment.create({
		data: {
			content,
			postId,
			userId,
		},
	});
};
