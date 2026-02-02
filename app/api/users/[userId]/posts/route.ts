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
			error: "Unauthorized",
			status: 400,
		});
	}

	try {
		const posts = await db.post.findMany({
			where: {
				userId,
			},
			include: {
				owner: true,
				comments: true,
				PostReaction: true,
				community: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch posts",
			status: 500,
		});
	}
}
