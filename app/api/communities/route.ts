import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const communities = await db.community.findMany({
			include: {
				joinedBy: true,
			},
		});

		return NextResponse.json(communities);
	} catch (error) {
		NextResponse.json({
			error: "Failed to fetch communities",
			status: 500,
		});
	}
}
