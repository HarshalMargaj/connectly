"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getPostsByUser = async () => {
	const { userId } = await auth();
	const id = userId as string;

	return await db.post.findMany({
		where: {
			userId: id,
		},
		include: {
			owner: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};
