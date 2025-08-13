"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const create = async (formData: FormData) => {
	const { userId } = await auth();

	if (!userId) {
		redirect("/signin");
	}

	const name = formData.get("name") as string;
	const description = formData.get("description") as string;

	await db.community.create({
		data: {
			name: `r/${name}`,
			description,
			userId,
		},
	});
};
