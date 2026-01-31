import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const posts = await db.post.findMany({
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
