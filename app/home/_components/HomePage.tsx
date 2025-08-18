"use client";

import { getPosts } from "@/actions/get-posts";
import PostCard from "@/app/community/[slug]/_components/PostCard";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const HomePage = () => {
	const { data: posts, isLoading } = useQuery({
		queryFn: getPosts,
		queryKey: ["allPosts"],
	});

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
		<div className="p-5 space-y-4 pb-20">
			{posts?.map(post => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
};

export default HomePage;
