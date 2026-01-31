import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

	try {
		const posts = await db.user.findUnique({
			where: { id: userId },
			include: {
				savedPosts: {
					include: {
						owner: true,
						comments: true,
						PostReaction: true,
						community: true,
					},
				},
			},
		});

		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch saved posts",
			status: 500,
		});
	}
}
