"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const updatePost = async (formData: FormData) => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		return redirectToSignIn();
	}

	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const postId = formData.get("postId") as string;

	await db.post.update({
		where: {
			id: postId,
		},
		data: {
			title,
			description,
		},
	});
};
