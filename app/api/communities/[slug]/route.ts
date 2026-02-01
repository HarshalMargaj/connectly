import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;
	const { slug } = resolvedParams;

	try {
		const community = await db.community.findUnique({
			where: {
				slug,
			},
			include: {
				joinedBy: true,
				posts: true,
			},
		});

		return NextResponse.json(community);
	} catch (error) {
		return NextResponse.json({
			error: "Failed to fetch community",
			status: 500,
		});
	}
}
