import { db } from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const userId = url.searchParams.get("userId");

	// const { userId } = await auth();

	try {
		let posts;
		if (userId) {
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
