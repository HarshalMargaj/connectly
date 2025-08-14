"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ReactionType } from "@prisma/client";

export const toggleReaction = async (postId: string, type: ReactionType) => {
	const { userId } = await auth();
	if (!userId) throw new Error("Unauthorized");

	const existing = await db.postReaction.findUnique({
		where: { postId_userId: { postId, userId } },
	});

	if (!existing) {
		// Create new reaction
		await db.postReaction.create({
			data: { postId, userId, type },
		});
	} else if (existing.type === type) {
		// Remove reaction if same type (toggle off)
		await db.postReaction.delete({
			where: { id: existing.id },
		});
	} else {
		// Update reaction type
		await db.postReaction.update({
			where: { id: existing.id },
			data: { type },
		});
	}
};
