"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const createPost = async (formData: FormData) => {
	const { userId, redirectToSignIn } = await auth();
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const communityId = formData.get("communityId") as string;

	if (!userId) {
		return redirectToSignIn();
	}

	await db.post.create({
		data: {
			title,
			description,
			userId,
			communityId,
			likes: 0,
			dislikes: 0,
		},
	});
};
