"use client";

import React from "react";

import { Prisma } from "@prisma/client";

import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import PostCard from "@/app/(main)/community/[slug]/_components/PostCard";
import NoPosts from "@/components/NotPosts";
import { useAuth } from "@clerk/nextjs";
import { useUserSavedPostsQuery } from "@/hooks/useUserSavedPostsQuery";

type Post = Prisma.PostGetPayload<{
	include: {
		owner: true;
		comments: true;
		PostReaction: true;
		community: true;
	};
}>;

const SavedPosts = () => {
	const { userId } = useAuth();

	if (!userId) return null;

	const { data: savedPosts = [], isLoading } = useUserSavedPostsQuery({
		userId: userId,
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
		<div className="space-y-4 pt-4">
			{savedPosts?.length > 0 ? (
				savedPosts?.map((post: Post) => (
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
