import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ communityId: string }>;
	},
) {
	try {
		const { communityId } = await params;

		console.log(communityId);

		const posts = await db.post.findMany({
			where: { communityId },
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
			error: "Failed to fetch community posts",
			status: 500,
		});
	}
}
