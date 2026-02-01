import { db } from "@/lib/db";
import { getUserId } from "@/lib/getUserId";
import { NextResponse } from "next/server";

export async function POST({
	params,
}: {
	params: Promise<{ postId: string }>;
}) {
	const userId = await getUserId();
	const resolvedParams = await params;
	const { postId } = resolvedParams;

	try {
		await db.user.update({
			where: {
				id: userId,
			},
			data: {
				savedPosts: {
					connect: { id: postId },
				},
			},
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to save post",
			status: 500,
		});
	}
}

export async function DELETE({
	params,
}: {
	params: Promise<{ postId: string }>;
}) {
	const userId = await getUserId();
	const resolvedParams = await params;
	const { postId } = resolvedParams;

	try {
		await db.user.update({
			where: {
				id: userId,
			},
			data: {
				savedPosts: {
					disconnect: { id: postId },
				},
			},
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to unsave post",
			status: 500,
		});
	}
}
