"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";

import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";
import PostCard from "@/app/(main)/community/[slug]/_components/PostCard";
import NoPosts from "@/components/NotPosts";

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

	const getUserSavedPosts = async () => {
		const res = await fetch(`/api/posts/saved?userId=${userId}`);
		if (!res.ok) {
			toast.error("Failed to fetch user saved posts");
		}

		return res.json();
	};

	const { data: savedPosts = [], isLoading } = useQuery({
		queryFn: getUserSavedPosts,
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
