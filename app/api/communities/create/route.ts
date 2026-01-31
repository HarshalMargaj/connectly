import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { userId } = await auth();
	const { description, slug, name } = await req.json();
	console.log(description, slug, name);

	if (!userId) {
		return NextResponse.json({
			error: "Unauthorized",
			status: 400,
		});
	}

	if (!name || !description || !slug) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		);
	}

	try {
		await db.community.create({
			data: {
				name: `r/${name}`,
				description,
				userId,
				slug,
			},
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({
			error: "Failed to create community",
			status: 500,
		});
	}
}
