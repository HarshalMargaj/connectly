"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const getJoinedCommunities = async (userId: string) => {
	if (!userId) {
		throw new Error("Not authenticated");
	}

	const user = await db.user.findUnique({
		where: { userId },
		include: { joinedCommunities: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	return user.joinedCommunities;
};
