"use client";

import { get } from "@/actions/get-communities";
import { useQuery } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import React from "react";
import Card from "./_components/Card";

const page = () => {
	const { data: communities, isLoading } = useQuery({
		queryFn: get,
		queryKey: ["allCommunities"],
	});

	return (
		<div className="p-5 grid gap-4 grid-cols-3 grid-rows-8 w-fit mx-auto">
			{communities?.map(community => (
				<Card key={community.id} community={community} />
			))}
		</div>
	);
};

export default page;
