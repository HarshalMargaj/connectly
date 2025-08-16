"use client";

import { getByComId } from "@/actions/get-communityById";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import CommunityPage from "./CommunityPage";

const Community = () => {
	const params = useParams();
	const id = params?.id as string;

	const { data: community, isLoading } = useQuery({
		queryKey: ["community", id],
		queryFn: () => getByComId(id as string),
		enabled: !!id,
	});

	if (isLoading) return <div>Loading...</div>;
	if (!community) return <div>Community not found</div>;

	return (
		<div className="overflow-y-scroll h-screen scroll-smooth">
			<CommunityPage community={community} />
		</div>
	);
};

export default Community;
