"use client";

import { getCommentsByUser } from "@/actions/get-comments-by-user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CommentCard from "./CommentCard";
import CommentCardSkeleton from "@/components/skeletons/CommentCardSkeleton";
import NoPosts from "@/components/NotPosts";

const UserComments = () => {
	const { data: comments = [], isLoading } = useQuery({
		queryFn: getCommentsByUser,
		queryKey: ["comments"],
	});

	if (isLoading) {
		return (
			<div className=" pt-4 space-y-4">
				{[...Array(3)].map((_, i) => (
					<CommentCardSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className=" pt-4 space-y-4">
			{comments?.length > 0 ? (
				comments?.map(comment => (
					<CommentCard key={comment.id} comment={comment} />
				))
			) : (
				<NoPosts
					title="No comments yet"
					description="Looks like you haven’t joined any discussions yet. Share your thoughts by commenting on posts!"
				/>
			)}
		</div>
	);
};

export default UserComments;
