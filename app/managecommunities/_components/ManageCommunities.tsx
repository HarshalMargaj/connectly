"use client";

import { getJoinedCommunities } from "@/actions/joined-communities";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import Community from "./Community";
import NotFound from "./NotFound";

const ManageCommunities = () => {
	const { user } = useUser();
	const [searchQuery, setSearchQuery] = useState<string>("");

	const { data: communities = [], isLoading } = useQuery({
		queryFn: () => getJoinedCommunities(user?.id as string),
		queryKey: ["joinedcommunities"],
	});

	const filterCommunities = communities.filter(c =>
		c.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="p-5 space-y-4 ">
			<h1 className="text-3xl font-semibold">Manage Communities</h1>
			<div>
				<SearchFilter setSearchQuery={setSearchQuery} />
			</div>
			<div className="space-y-4 ">
				{filterCommunities?.length > 0 ? (
					filterCommunities?.map(community => (
						<Community
							key={community.id}
							community={community}
							data={communities}
						/>
					))
				) : (
					<NotFound />
				)}
			</div>
		</div>
	);
};

export default ManageCommunities;
