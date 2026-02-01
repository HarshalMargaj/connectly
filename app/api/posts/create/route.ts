import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { userId } = await auth();
	const { title, description, communityId } = await req.json();

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

	try {
		await db.post.create({
			data: {
				title,
				description,
				userId,
				communityId,
				likes: 0,
				dislikes: 0,
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
