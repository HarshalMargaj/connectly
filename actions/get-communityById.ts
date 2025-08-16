"use server";

import { db } from "@/lib/db";

export const getByComId = async (slug: string) => {
	return await db.community.findUnique({
		where: {
			slug,
		},
	});
};
