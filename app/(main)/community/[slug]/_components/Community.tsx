"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import CommunityPage from "./CommunityPage";
import CommunityPageSkeleton from "@/components/skeletons/CommunityPageSkeleton";
import { toast } from "sonner";
import type { Community } from "@prisma/client";

const Community = () => {
	const params = useParams();
	const slug = params?.slug as string;

	const getCommunity = async () => {
		const res = await fetch(`/api/communities/${slug}`);

		if (!res.ok) {
			toast.error("Failed to fetch community");
		}

		return res.json();
	};

	const { data: community, isLoading } = useQuery({
		queryFn: getCommunity,
		queryKey: ["community", slug],
		enabled: !!slug,
	});

	if (isLoading) return <CommunityPageSkeleton />;
	if (!community) return <div>Community not found</div>;

	return (
		<div>
			<CommunityPage community={community} />
		</div>
	);
};

export default Community;
