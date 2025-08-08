"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const joinCommunity = async (communityId: string) => {
	const { userId } = await auth();

	if (!userId) {
		redirect("/signin");
	}

	await db.user.update({
		where: {
			userId,
		},
		data: {
			joinedCommunities: {
				connect: { id: communityId },
			},
		},
	});

	console.log("success joined");
};
