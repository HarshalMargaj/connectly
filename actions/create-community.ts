"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import slugify from "slugify";

export const create = async (formData: FormData) => {
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		return redirectToSignIn();
	}

	const name = formData.get("name") as string;
	const description = formData.get("description") as string;
	const slug = slugify(name, { lower: true, strict: true });

	await db.community.create({
		data: {
			name: `r/${name}`,
			description,
			userId,
			slug,
		},
	});
};
