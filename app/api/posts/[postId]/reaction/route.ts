import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
	req: Request,
	{
		params,
	}: {
		params: Promise<{ postId: string }>;
	},
) {
	const { type } = await req.json();
	const resolvedParams = await params;
	const { postId } = resolvedParams;
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

	try {
		const existing = await db.postReaction.findUnique({
			where: { postId_userId: { postId, userId } },
		});

		if (!existing) {
			// Create new reaction
			await db.postReaction.create({
				data: { postId, userId, type },
			});
		} else if (existing.type === type) {
			// Remove reaction if same type (toggle off)
			await db.postReaction.delete({
				where: { id: existing.id },
			});
		} else {
			// Update reaction type
			await db.postReaction.update({
				where: { id: existing.id },
				data: { type },
			});
		}

		return NextResponse.json({ success: true });
	} catch (error: any) {
		console.error("Failed to toggle reaction:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to toggle reaction" },
			{ status: 500 },
		);
	}
}
