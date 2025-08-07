"use client";

import React from "react";

import { getByComId } from "@/actions/get-communityById";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CommunityPage from "./_components/CommunityPage";

const page = () => {
	const params = useParams();
	const id = params?.id as string;

	const { data: community, isLoading } = useQuery({
		queryKey: ["community", id],
		queryFn: () => getByComId(id as string),
		enabled: !!id,
	});

	if (isLoading) return <div>Loading...</div>;
	if (!community) return <div>Community not found</div>;

	return <CommunityPage community={community} />;
};

export default page;
