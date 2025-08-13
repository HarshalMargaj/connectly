"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
	const { userId } = await auth();
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;
	const communityId = formData.get("communityId") as string;

	if (!userId) {
		redirect("/signin");
	}

	await db.post.create({
		data: {
			title,
			description,
			userId,
			communityId,
		},
	});
};
