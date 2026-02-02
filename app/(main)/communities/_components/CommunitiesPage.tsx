"use client";

import { useQuery } from "@tanstack/react-query";

import React from "react";
import Card from "./Card";

import CommunityCardSkeleton from "@/components/skeletons/CommCardSkeleton";

import { useSidebar } from "@/store/sidebar.store";
import { Prisma } from "@prisma/client";

type Community = Prisma.CommunityGetPayload<{
	include: { joinedBy: true };
}>;

const CommunitiesPage = () => {
	const getCommunities = async () => {
		const res = await fetch("api/communities");

		if (!res.ok) {
			throw new Error("Failed to fetch communities");
		}

		return res.json();
	};

	const { data: communities = [], isLoading } = useQuery({
		queryFn: getCommunities,
		queryKey: ["allCommunities"],
	});

	const isSidebarOpen = useSidebar(state => state.isSidebarOpen);

	if (isLoading) {
		return (
			<div className="p-5 grid gap-4 grid-cols-3 grid-rows-8 w-fit mx-auto">
				{Array.from({ length: 18 }).map((_, i) => (
					<CommunityCardSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div
			className={`p-5 grid gap-4 md:grid-cols-1 lg:grid-cols-3 grid-cols-1  ${
				isSidebarOpen
					? "lg:grid-cols-3"
					: "lg:grid-cols-4 md:grid-cols-2"
			}`}
		>
			{communities?.map((community: Community) => (
				<Card key={community.id} community={community} />
			))}
		</div>
	);
};

export default CommunitiesPage;
