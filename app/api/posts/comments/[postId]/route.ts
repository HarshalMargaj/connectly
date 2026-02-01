import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
	params: {
		postId: string;
	};
}

export async function GET(req: Request, { params }: Params) {
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
