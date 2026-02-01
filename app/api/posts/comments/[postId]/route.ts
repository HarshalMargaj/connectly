import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{
		params,
	}: {
		params: Promise<{ postId: string }>;
	},
) {
	const resolvedParams = await params;
	const { postId } = resolvedParams;

	try {
		const comments = await db.comment.findMany({
			where: { postId },
			include: {
				author: true,
			},
		});

		return NextResponse.json(comments);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch comments",
			status: 500,
		});
	}
}
