"use client";

import { getCommentsByUser } from "@/actions/get-comments-by-user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CommentCard from "./CommentCard";
import CommentCardSkeleton from "@/components/skeletons/CommentCardSkeleton";

const UserComments = () => {
	const { data: comments, isLoading } = useQuery({
		queryFn: getCommentsByUser,
		queryKey: ["comments"],
	});

	if (isLoading) {
		return (
			<div className="pb-20 pt-4 space-y-4">
				{[...Array(3)].map((_, i) => (
					<CommentCardSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<div className="pb-20 pt-4 space-y-4">
			{comments?.map(comment => (
				<CommentCard key={comment.id} comment={comment} />
			))}
		</div>
	);
};

export default UserComments;
