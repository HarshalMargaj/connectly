"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard from "./PostCard";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";

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

interface PostSectionProps {
	communityId: string;
}

const PostSection = ({ communityId }: PostSectionProps) => {
	const getCommunityPosts = async () => {
		const res = await fetch(`/api/posts?communityId=${communityId}`);

		if (!res.ok) {
			toast.error("Failed to fetch community posts");
		}

		return res.json();
	};

	const { data: posts = [] } = useQuery({
		queryFn: getCommunityPosts,
		queryKey: ["posts", communityId],
	});

	return (
		<div className="space-y-2">
			{posts?.map((post: Post) => (
				<PostCard
					key={post.id}
					post={post}
					showUser={true}
					showCommunity={false}
				/>
			))}
		</div>
	);
};

export default PostSection;
