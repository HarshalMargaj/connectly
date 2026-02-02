"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import SearchFilter from "./SearchFilter";
import Community from "./Community";
import NotFound from "./NotFound";
import ManageCommunitiesSkeleton from "@/components/skeletons/ManageCommSkeleton";
import { toast } from "sonner";
import type { Community as CommunityPayload } from "@prisma/client";

const ManageCommunities = () => {
	const { user } = useUser();
	const [searchQuery, setSearchQuery] = useState<string>("");

	const getUserJoinedCommunities = async () => {
		const res = await fetch(`/api/users/${user?.id}/joinedCommunities`);

		if (!res.ok) {
			toast.error("Failed to fetch user joined communities");
			console.error("Failed to fetch user joined communities");
		}

		return res.json();
	};

	const { data: communities = [], isLoading } = useQuery({
		queryFn: getUserJoinedCommunities,
		queryKey: ["joinedCommunities", user?.id],
	});

	const filterCommunities =
		communities.filter((c: CommunityPayload) =>
			c.name.toLowerCase().includes(searchQuery.toLowerCase()),
		) || [];

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
					filterCommunities?.map((community: CommunityPayload) => (
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
