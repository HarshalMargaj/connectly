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
		const communities = await db.community.findMany({
			where: {
				userId,
			},
			include: {
				joinedBy: true,
			},
		});
		return NextResponse.json(communities);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch communities",
			status: 500,
		});
	}
}
