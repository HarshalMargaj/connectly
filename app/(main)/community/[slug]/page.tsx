import React, { Suspense } from "react";

import Community from "./_components/Community";
import type { Metadata } from "next";
import { db } from "@/lib/db";
import CommunityPageSkeleton from "@/components/skeletons/CommunityPageSkeleton";

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

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	return (
		<Suspense fallback={<CommunityPageSkeleton />}>
			<Community slug={slug} />
		</Suspense>
	);
}
