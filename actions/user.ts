// lib/actions/user.ts
"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function ensureUserExists() {
	const { userId } = await auth();

	if (userId) {
		const existingUser = await db.user.findUnique({ where: { userId } });

		if (!existingUser) {
			// Fetch full user info from Clerk
			const user = await currentUser();

			if (!user) return;

			await db.user.create({
				data: {
					userId,
					userName: `${user?.fullName?.split(" ").join("")}`,
					userImage: user.imageUrl,
				},
			});
		}
	}
}
