import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ userId: string }>;
	},
) {
	const { userId } = await params;

	if (!userId) {
		return NextResponse.json({
			error: "Unathorized",
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
