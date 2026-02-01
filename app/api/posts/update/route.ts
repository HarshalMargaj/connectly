import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
	const { postId, title, description } = await req.json();

	try {
		await db.post.update({
			where: {
				id: postId,
			},
			data: {
				title,
				description,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to create post",
			status: 500,
		});
	}
}
