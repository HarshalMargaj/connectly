"use server";

import { db } from "@/lib/db";

export const createBulkPosts = async () => {
	await db.post.createMany({
		data: [
			{
				title: "AI Is Not Taking Your Job, But This Might",
				description:
					"AI is not here to replace developers entirely. What it is replacing are repetitive, low-impact tasks. Developers who refuse to adapt, avoid learning AI tools, or stop improving fundamentals are at risk. Those who learn how to collaborate with AI will move faster and stay relevant.",
				userId: "user_1",
				communityId: "community_tech",
				likes: 0,
				dislikes: 0,
			},
		],
	});
};
