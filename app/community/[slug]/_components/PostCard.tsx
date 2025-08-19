import { Prisma } from "@prisma/client";
import {
	Bookmark,
	EllipsisVertical,
	icons,
	MessageSquareText,
	Pencil,
	ThumbsDown,
	ThumbsUp,
	Trash,
} from "lucide-react";
import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCommentsById } from "@/actions/get-comments-by-id";
import Comment from "./Comment";
import { toggleReaction } from "@/actions/toggle-reaction";
import { useUser } from "@clerk/nextjs";
import NotFound from "./NotFound";
import { CommunityMenu } from "@/components/community-menu";
import { deletePost } from "@/actions/delete-post";
import { savePost } from "@/actions/save-post";

type PostWithOwner = Prisma.PostGetPayload<{
	include: {
		owner: true;
		comments: true;
		PostReaction: true;
		community: true;
	};
}>;

interface PostCardProps {
	post: PostWithOwner;
	showUser?: boolean;
	showCommunity?: boolean;
}

const PostCard = ({ post, showUser, showCommunity }: PostCardProps) => {
	const [openComment, setOpenComment] = useState<boolean>(false);
	const { user } = useUser();

	const { data: comments = [], isLoading } = useQuery({
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

	const { mutateAsync: deletePostMutation } = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			console.log("post deleted", post.id);
		},
	});

	const { mutateAsync: savePostMutation } = useMutation({
		mutationFn: savePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			console.log("post saved", post.id);
		},
	});

	const likeCount = post.PostReaction.filter(r => r.type === "LIKE").length;
	const dislikeCount = post.PostReaction.filter(
		r => r.type === "DISLIKE"
	).length;
	const commentsCount = post.comments.filter(
		c => c.postId === post.id
	).length;

	const hasLiked = post.PostReaction.some(
		r => r.type === "LIKE" && r.userId === user?.id
	);

	const hasDisliked = post.PostReaction.some(
		r => r.type === "DISLIKE" && r.userId === user?.id
	);

	const postMenuItemsForOwnPost = [
		{
			id: "1",
			name: "Delete",
			action: () => deletePostMutation(post.id),
			icon: <Trash />,
		},
		{
			id: "2",
			name: "Save",
			action: () => savePostMutation(post.id),
			icon: <Bookmark />,
		},
		{ id: "3", name: "Edit", action: () => {}, icon: <Pencil /> },
	];

	const postMenuItemsFormOthersPost = [
		{
			id: "1",
			name: "Save",
			action: () => savePostMutation(post.id),
			icon: <Bookmark />,
		},
	];

	return (
		<div
			key={post.id}
			className="border border-neutral-900 p-5 rounded-md space-y-4 max-h-[600px] overflow-hidden"
		>
			<div className={`flex items-center justify-between`}>
				<div
					className={`flex ${
						showUser && showCommunity
							? "items-start"
							: "items-center"
					} gap-2`}
				>
					<div className="flex items-center gap-2">
						<img
							src={post?.owner?.userImage}
							alt=""
							width={25}
							height={25}
							className="rounded-full"
						/>
						<div className="text-sm">
							{showCommunity && (
								<div className="font-semibold">
									{post.community?.name}
								</div>
							)}
							{showUser && (
								<div className="text-neutral-400">
									{post.owner?.userName}
								</div>
							)}
						</div>
					</div>
					<div className="text-xs text-neutral-500">{`${post.createdAt.toDateString()} ${post.createdAt.toLocaleTimeString()}`}</div>
				</div>
				<div>
					<CommunityMenu
						items={
							user?.id === post.userId
								? postMenuItemsForOwnPost
								: postMenuItemsFormOthersPost
						}
						icon={<EllipsisVertical />}
					/>
				</div>
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
				{commentsCount}
			</div>
			{openComment && (
				<div className="space-y-4 ">
					<AddCommentForm
						postId={post.id}
						userId={user?.id as string}
					/>
					<div className="space-y-2 overflow-y-scroll scrollbar-hide max-h-[400px] pb-15">
						{comments?.length > 0 ? (
							comments?.map(comment => (
								<Comment key={comment.id} comment={comment} />
							))
						) : (
							<NotFound />
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default PostCard;
