import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const { userId } = await auth();
	const communityId = url.searchParams.get("communityId");

	try {
		let posts;
		if (communityId) {
			posts = await db.post.findMany({
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
		} else if (userId) {
			posts = await db.post.findMany({
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
		} else {
			posts = await db.post.findMany({
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
		}

		return NextResponse.json(posts);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch posts",
			status: 500,
		});
	}
}
