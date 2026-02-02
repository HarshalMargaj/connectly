import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ userId: string }>;
	},
) {
	const { userId } = await params;

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
