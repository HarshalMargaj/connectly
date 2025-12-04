import React from "react";
import { getByComId } from "@/actions/get-communityBySlug";
import Community from "./_components/Community";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const community = await getByComId(slug);

	return {
		title: `${community?.name} | Community`,
		description: community?.description,
	};
}

export default function Page() {
	return <Community />;
}
