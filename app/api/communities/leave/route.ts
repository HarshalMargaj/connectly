import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	const { userId, communityId } = await req.json();

	try {
		await db.user.update({
			where: { id: userId },
			data: {
				joinedCommunities: {
					disconnect: { id: communityId },
				},
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to leave community",
			status: 500,
		});
	}
}
