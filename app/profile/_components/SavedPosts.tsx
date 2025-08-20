"use client";

import { getSavedPosts } from "@/actions/get-saved-posts";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import PostCard from "@/app/community/[slug]/_components/PostCard";
import NoPosts from "../../../components/NotPosts";

const SavedPosts = () => {
	const { data: savedPosts = [], isLoading } = useQuery({
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
			{savedPosts?.length > 0 ? (
				savedPosts?.map(post => (
					<PostCard
						key={post.id}
						post={post}
						showUser={true}
						showCommunity={true}
					/>
				))
			) : (
				<NoPosts
					title="No saved posts"
					description="You haven’t saved any posts yet. Tap the bookmark icon on posts you want to revisit later."
				/>
			)}
		</div>
	);
};

export default SavedPosts;
