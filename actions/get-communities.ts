"use server";

import { db } from "@/lib/db";

export const get = async () => {
	return await db.community.findMany({
		include: {
			joinedBy: true,
		},
	});
};
