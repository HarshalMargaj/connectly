"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";

import CommentCard from "./CommentCard";
import CommentCardSkeleton from "@/components/skeletons/CommentCardSkeleton";
import NoPosts from "@/components/NotPosts";

import { toast } from "sonner";
import { Prisma } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";

type Comment = Prisma.CommentGetPayload<{
	include: {
		author: true;
		post: {
			include: {
				community: true;
			};
		};
	};
}>;

const UserComments = () => {
	const { userId } = useAuth();

	const getUserComments = async () => {
		const res = await fetch(`/api/users/${userId}/comments`);

		if (!res.ok) {
			toast.error("Failed to fetch user comments");
		}

		return res.json();
	};

	const { data: comments = [], isLoading } = useQuery({
		queryFn: getUserComments,
		queryKey: ["comments", userId],
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
			{comments.Comment?.length > 0 ? (
				comments.Comment?.map((comment: Comment) => (
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
