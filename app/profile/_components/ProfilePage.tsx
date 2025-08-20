"use client";

import { getPostsByUser } from "@/actions/get-posts-by-user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { Prisma } from "@prisma/client";

import NoPosts from "../../../components/NotPosts";
import PostCard from "@/app/community/[slug]/_components/PostCard";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

type PostsWithOwner = Prisma.PostGetPayload<{
	include: {
		owner: true;
		comments: true;
		PostReaction: true;
		community: true;
	};
}>;

const ProfilePage = () => {
	const { data: posts = [], isLoading } = useQuery({
		queryFn: getPostsByUser,
		queryKey: ["userPosts"],
	});

	if (isLoading) {
		return (
			<div className="space-y-4 mt-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<ProfileSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="pt-4 pb-20 space-y-4 h-full">
			{posts.length > 0 ? (
				posts?.map((post: PostsWithOwner) => (
					<PostCard
						key={post.id}
						post={post}
						showUser={true}
						showCommunity={true}
					/>
				))
			) : (
				<div className="h-full">
					<NoPosts
						title="No posts yet"
						description="Looks like you haven’t shared anything yet. Start creating posts to share your thoughts with the community!"
					/>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
