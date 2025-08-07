"use server";

import { db } from "@/lib/db";

export const create = async (formData: FormData) => {
	const name = formData.get("name") as string;
	const description = formData.get("description") as string;

	await db.community.create({
		data: {
			name: `r/${name}`,
			description,
		},
	});
};
