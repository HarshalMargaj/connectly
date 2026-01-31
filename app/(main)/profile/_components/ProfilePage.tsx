"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

import type { Prisma } from "@prisma/client";

import NoPosts from "@/components/NotPosts";
import PostCard from "@/app/(main)/community/[slug]/_components/PostCard";
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
	const { userId } = useAuth();

	const getUserPosts = async () => {
		const res = await fetch(`/api/posts?userId=${userId}`);

		if (!res.ok) {
			toast.error("Failed to fetch user posts");
		}

		return res.json();
	};

	const { data: posts = [], isLoading } = useQuery({
		queryFn: getUserPosts,
		queryKey: ["userPosts", userId],
		enabled: !!userId,
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
		<div className="pt-4 space-y-4 h-full">
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
