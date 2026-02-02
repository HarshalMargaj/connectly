import React from "react";

import Community from "./_components/Community";
import type { Metadata } from "next";
import { db } from "@/lib/db";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const community = await db.community.findUnique({
		where: { slug },
		select: {
			name: true,
			description: true,
		},
	});

	return {
		title: `${community?.name} | Community`,
		description: community?.description,
	};
}

export default function Page() {
	return <Community />;
}
