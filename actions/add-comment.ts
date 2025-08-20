"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const addComment = async (formData: FormData) => {
	const { userId, redirectToSignIn } = await auth();
	const content = formData.get("content") as string;
	const postId = formData.get("postId") as string;

	if (!userId) {
		return redirectToSignIn();
	}

	await db.comment.create({
		data: {
			content,
			postId,
			userId,
		},
	});
};
