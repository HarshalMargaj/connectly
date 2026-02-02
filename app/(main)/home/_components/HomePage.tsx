"use client";

import PostCard from "@/app/(main)/community/[slug]/_components/PostCard";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { Prisma } from "@prisma/client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

type Post = Prisma.PostGetPayload<{
	include: {
		owner: true;
		comments: true;
		PostReaction: true;
		community: true;
	};
	orderBy: {
		createdAt: "desc";
	};
}>;

const HomePage = () => {
	const getAllPosts = async () => {
		const res = await fetch("/api/posts");

		if (!res.ok) {
			toast.error("Failed to fetch posts");
			throw new Error("Failed to fetch posts");
		}

		return res.json();
	};

	const { data: posts = [], isLoading } = useQuery({
		queryFn: getAllPosts,
		queryKey: ["allPosts"],
	});

	console.log(posts);

	if (isLoading) {
		return (
			<div className="space-y-4 p-5">
				{Array.from({ length: 5 }).map((_, i) => (
					<HomeSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="p-5 space-y-4 w-full">
			{posts?.map((post: Post) => (
				<PostCard
					key={post.id}
					post={post}
					showUser={true}
					showCommunity={true}
				/>
			))}
		</div>
	);
};

export default HomePage;
