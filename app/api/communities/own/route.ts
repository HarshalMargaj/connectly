import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	const { userId } = await auth();

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
