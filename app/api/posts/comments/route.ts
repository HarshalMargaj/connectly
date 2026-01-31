import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const userId = url.searchParams.get("userId");

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

	try {
		const comments = await db.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				Comment: {
					include: {
						author: true,
						post: {
							include: {
								community: true,
							},
						},
					},
				},
			},
		});

		return NextResponse.json(comments);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch user comments",
			status: 500,
		});
	}
}
