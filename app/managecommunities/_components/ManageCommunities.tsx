"use client";

import { getJoinedCommunities } from "@/actions/joined-communities";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import Community from "./Community";
import NotFound from "./NotFound";
import ManageCommunitiesSkeleton from "@/components/skeletons/ManageCommSkeleton";

const ManageCommunities = () => {
	const { user } = useUser();
	const [searchQuery, setSearchQuery] = useState<string>("");

	const { data: communities = [], isLoading } = useQuery({
		queryFn: () => getJoinedCommunities(user?.id as string),
		queryKey: ["joinedcommunities", user?.id],
	});

	const filterCommunities = communities.filter(c =>
		c.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (isLoading) return <ManageCommunitiesSkeleton />;

	if (communities.length === 0) {
		return <NotFound />;
	}

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
					<div className="flex flex-col items-center justify-center py-10 text-center h-[300px]">
						<p className="text-lg font-semibold">
							No results found
						</p>
						<p className="text-muted-foreground max-w-sm">
							Try a different search term to find your
							communities.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ManageCommunities;
