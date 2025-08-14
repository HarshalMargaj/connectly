import { Prisma } from "@prisma/client";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsById } from "@/actions/get-comments-by-id";
import Comment from "./Comment";
import { toggleReaction } from "@/actions/toggle-reaction";
import { useUser } from "@clerk/nextjs";

type PostWithOwner = Prisma.PostGetPayload<{
	include: { owner: true; comments: true; PostReaction: true };
}>;

interface PostCardProps {
	post: PostWithOwner;
}

const PostCard = ({ post }: PostCardProps) => {
	const [openComment, setOpenComment] = useState<boolean>(false);
	const { user } = useUser();

	const { data: comments, isLoading } = useQuery({
		queryFn: () => getCommentsById(post.id),
		queryKey: ["comments", post.id],
	});

	const queryClient = useQueryClient();

	const { mutate: toggleReactionMutation } = useMutation({
		mutationFn: (reactionType: "LIKE" | "DISLIKE") =>
			toggleReaction(post.id, reactionType), // your API
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({
				queryKey: ["posts", post.communityId],
			}); // also update community page
		},
	});

	const likeCount = post.PostReaction.filter(r => r.type === "LIKE").length;
	const dislikeCount = post.PostReaction.filter(
		r => r.type === "DISLIKE"
	).length;

	const hasLiked = post.PostReaction.some(
		r => r.type === "LIKE" && r.userId === user?.id
	);

	const hasDisliked = post.PostReaction.some(
		r => r.type === "DISLIKE" && r.userId === user?.id
	);

	return (
		<div
			key={post.id}
			className="border border-neutral-900 p-5 rounded-md space-y-4 max-h-[400px] overflow-hidden"
		>
			<div className="flex items-center gap-2">
				<div className="flex items-center gap-2">
					<img
						src={post?.owner?.userImage}
						alt=""
						width={25}
						height={25}
						className="rounded-full"
					/>
					<div>u/{post.owner?.userName}</div>
				</div>
				<div className="text-xs text-neutral-500">{`${post.createdAt.toDateString()} ${post.createdAt.toLocaleTimeString()}`}</div>
			</div>
			<div className="text-xl">{post.title}</div>
			<div className="text-neutral-400">{post.description}</div>
			<div className="flex items-center gap-4 select-none">
				<button
					className={`flex items-center gap-4 ${
						hasLiked ? "text-blue-400" : "text-white"
					}`}
					onClick={() => toggleReactionMutation("LIKE")}
				>
					<ThumbsUp /> {likeCount}
				</button>
				<button
					className={`flex items-center gap-4 ${
						hasDisliked ? "text-red-500" : "text-white"
					}`}
					onClick={() => toggleReactionMutation("DISLIKE")}
				>
					<ThumbsDown /> {dislikeCount}
				</button>
				<MessageSquareText
					onClick={() => setOpenComment(!openComment)}
				/>{" "}
				{post?.comments?.length}
			</div>
			{openComment && (
				<div className="space-y-2 ">
					<AddCommentForm
						postId={post.id}
						userId={user?.id as string}
					/>
					<div className="space-y-2 overflow-y-scroll h-[200px] pb-10">
						{comments?.map(comment => (
							<Comment key={comment.id} comment={comment} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default PostCard;
