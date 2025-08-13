// lib/actions/user.ts
"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function ensureUserExists() {
	const { userId } = await auth();

	if (userId) {
		const existingUser = await db.user.findUnique({ where: { userId } });
		if (!existingUser) {
			await db.user.create({ data: { userId } });
		}
	}
}
