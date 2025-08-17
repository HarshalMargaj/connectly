"use client";

import { getPostsByUser } from "@/actions/get-posts-by-user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import type { Prisma } from "@prisma/client";
import Post from "./Post";

type PostsWithOwner = Prisma.PostGetPayload<{
	include: { owner: true };
}>;

const ProfilePage = () => {
	const { data: posts = [], isLoading } = useQuery({
		queryFn: getPostsByUser,
		queryKey: ["userPosts"],
	});

	return (
		<div className="p-5 pb-20 space-y-4">
			<h1 className="text-3xl font-semibold">My Profile</h1>
			{posts?.map((post: PostsWithOwner) => (
				<Post key={post.id} post={post} />
			))}
		</div>
	);
};

export default ProfilePage;
