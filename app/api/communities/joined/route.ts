import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const url = new URL(req.url);
	const userId = url.searchParams.get("userId");

	if (!userId) {
		return NextResponse.json({
			error: "Unathorized",
			status: 400,
		});
	}

	try {
		const communities = await db.user.findUnique({
			where: { id: userId },
			include: { joinedCommunities: true },
		});

		return NextResponse.json(communities);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch user joined communities",
			status: 500,
		});
	}
}
