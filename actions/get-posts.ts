"use server";

import { db } from "@/lib/db";

export const getPosts = async () => {
	return await db.post.findMany({
		include: { owner: true },
	});
};
