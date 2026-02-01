import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	const { postId } = await req.json();
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

	try {
		await db.postReaction.deleteMany({
			where: { postId },
		});

		// 2. Delete comments
		await db.comment.deleteMany({
			where: { postId },
		});

		// 3. Delete the post
		await db.post.delete({
			where: {
				id: postId,
				userId,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to delete post",
			status: 500,
		});
	}
}
