"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const create = async (formData: FormData) => {
	const { userId } = await auth();

	if (!userId) {
		redirect("/signin");
	}

	// const existingUser = await db.user.findUnique({
	// 	where: {
	// 		userId: userId,
	// 	},
	// });

	// if (!existingUser) {
	// 	await db.user.create({
	// 		data: {
	// 			userId: userId,
	// 		},
	// 	});
	// }

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
