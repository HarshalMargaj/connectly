import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { content, postId } = await req.json();
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

	try {
		await db.comment.create({
			data: {
				content,
				postId,
				userId,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to add comment",
			status: 500,
		});
	}
}
