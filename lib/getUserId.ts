import { auth } from "@clerk/nextjs/server";

export const getUserId = async () => {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("Unauthorized");
	}

	return userId;
};
