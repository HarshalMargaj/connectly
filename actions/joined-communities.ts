"use server";

import { db } from "@/lib/db";

export const getJoinedCommunities = async (userId: string) => {
	if (!userId) {
		throw new Error("Not authenticated");
	}

	const user = await db.user.findUnique({
		where: { id: userId },
		include: { joinedCommunities: true },
	});

	if (!user) {
		throw new Error("User not found");
	}

	return user.joinedCommunities;
};
