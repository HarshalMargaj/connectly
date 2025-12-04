"use client";

import { getByComId } from "@/actions/get-communityBySlug";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import CommunityPage from "./CommunityPage";
import CommunityPageSkeleton from "@/components/skeletons/CommunityPageSkeleton";

const Community = () => {
	const params = useParams();
	const slug = params?.slug as string;

	const { data: community, isLoading } = useQuery({
		queryFn: () => getByComId(slug as string),
		queryKey: ["community", slug],
		enabled: !!slug,
	});

	if (isLoading) return <CommunityPageSkeleton />;
	if (!community) return <div>Community not found</div>;

	return (
		<div className="overflow-y-scroll h-screen scroll-smooth">
			<CommunityPage community={community} />
		</div>
	);
};

export default Community;
