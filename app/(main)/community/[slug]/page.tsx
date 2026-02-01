import React from "react";

import Community from "./_components/Community";
import type { Metadata } from "next";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const getCommunity = async () => {
		const res = await fetch(
			`http://localhost:3000/api/communities/${slug}`,
		);

		if (!res.ok) {
			console.error("Failed to fetch community");
		}

		return res.json();
	};

	const community = await getCommunity();

	return {
		title: `${community?.name} | Community`,
		description: community?.description,
	};
}

export default function Page() {
	return <Community />;
}
