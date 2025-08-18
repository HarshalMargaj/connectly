"use client";

import { getPostsByUser } from "@/actions/get-posts-by-user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { Prisma } from "@prisma/client";
import Post from "./Post";
import NoPosts from "./NotPosts";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

type PostsWithOwner = Prisma.PostGetPayload<{
	include: { owner: true };
}>;

const ProfilePage = () => {
	const { data: posts = [], isLoading } = useQuery({
		queryFn: getPostsByUser,
		queryKey: ["userPosts"],
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
		<div className="pt-4 pb-20 space-y-4 h-full">
			{posts.length > 0 ? (
				posts?.map((post: PostsWithOwner) => (
					<Post key={post.id} post={post} />
				))
			) : (
				<div className="h-full">
					<NoPosts />
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
