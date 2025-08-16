"use client";

import { getPosts } from "@/actions/get-posts";
import PostCard from "@/app/community/[id]/_components/PostCard";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const HomePage = () => {
	const { data: posts, isLoading } = useQuery({
		queryFn: getPosts,
		queryKey: ["allPosts"],
	});

	return (
		<div className="p-5 space-y-4 pb-20">
			{posts?.map(post => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
};

export default HomePage;
