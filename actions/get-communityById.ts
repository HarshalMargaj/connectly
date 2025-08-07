"use server";

import { db } from "@/lib/db";

export const getByComId = async (id: string) => {
	return await db.community.findUnique({
		where: {
			id,
		},
	});
};
