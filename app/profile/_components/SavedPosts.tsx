"use client";

import { getSavedPosts } from "@/actions/get-saved-posts";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Post from "./Post";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

const SavedPosts = () => {
	const { data: savedPosts, isLoading } = useQuery({
		queryFn: getSavedPosts,
		queryKey: ["savedPosts"],
	});

	if (isLoading) {
		return (
			<div className="space-y-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<ProfileSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="space-y-4 pt-4 pb-20">
			{savedPosts?.map(post => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};

export default SavedPosts;
