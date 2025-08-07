"use server";

import { db } from "@/lib/db";

export const create = async (formData: FormData) => {
	const title = formData.get("title") as string;
	const description = formData.get("description") as string;

	await db.create({
		title,
		description,
	});
};
