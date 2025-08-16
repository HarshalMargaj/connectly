"use server";

import { db } from "@/lib/db";

export const getByUser = async (userId: string) => {
	return await db.community.findMany({
		where: {
			userId,
		},
		include: {
			joinedBy: true,
		},
	});
};
