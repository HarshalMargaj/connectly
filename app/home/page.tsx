"use client";

import { getPosts } from "@/actions/get-posts";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard from "../community/[id]/_components/PostCard";

const home = () => {
	const { data: posts, isLoading } = useQuery({
		queryFn: getPosts,
		queryKey: ["allPosts"],
	});

	return (
		<div className="p-5">
			{posts?.map(post => (
				<PostCard post={post} />
			))}
		</div>
	);
};

export default home;
