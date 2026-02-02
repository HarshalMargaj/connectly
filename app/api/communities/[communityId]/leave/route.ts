import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
	_req: Request,
	{
		params,
	}: {
		params: Promise<{ communityId: string }>;
	},
) {
	const { communityId } = await params;

	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

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
