import { Prisma } from "@prisma/client";
import {
	Bookmark,
	BookmarkCheck,
	EllipsisVertical,
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
import { CommunityMenu } from "@/components/community-menu";
import { deletePost } from "@/actions/delete-post";
import { savePost } from "@/actions/save-post";
import NoPosts from "@/components/NotPosts";
import { DialogDemo } from "@/components/reusable-dialog";
import CreatePostForm from "./CreatePostForm";
import { getSavedPosts } from "@/actions/get-saved-posts";
import { unsavePost } from "@/actions/unsave-post";

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
	const [open, setOpen] = useState<boolean>(false);
	const { user } = useUser();

	const { data: comments = [] } = useQuery({
		queryFn: () => getCommentsById(post.id),
		queryKey: ["comments", post.id],
	});

	const queryClient = useQueryClient();

	const { mutate: toggleReactionMutation } = useMutation({
		mutationFn: (reactionType: "LIKE" | "DISLIKE") =>
			toggleReaction(post.id, reactionType), // your API
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({ queryKey: ["userPosts"] });
			queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
			queryClient.invalidateQueries({
				queryKey: ["posts", post.communityId],
			});
		},
	});

	const { mutateAsync: deletePostMutation } = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts", post.communityId],
			});
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({ queryKey: ["userPosts"] });
			queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
			queryClient.invalidateQueries({ queryKey: ["community"] });
			console.log("post deleted", post.id);
		},
	});

	const { data: saved } = useQuery({
		queryFn: getSavedPosts,
		queryKey: ["savedPosts"],
	});

	const hasSaved = saved?.find(sp => sp.id === post.id);

	const { mutateAsync: savePostMutation } = useMutation({
		mutationFn: hasSaved ? unsavePost : savePost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts", post.communityId],
			});
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({ queryKey: ["userPosts"] });
			queryClient.invalidateQueries({ queryKey: ["savedPosts"] });
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
			name: hasSaved ? "Remove from saved" : "Save",
			action: () => savePostMutation(post.id),
			icon: hasSaved ? <BookmarkCheck /> : <Bookmark />,
		},
		{
			id: "3",
			name: "Edit",
			action: () => setOpen(true),
			icon: <Pencil />,
		},
	];

	const postMenuItemsFormOthersPost = [
		{
			id: "1",
			name: hasSaved ? "Remove from saved" : "Save",
			action: () => savePostMutation(post.id),
			icon: <Bookmark />,
		},
	];

	return (
		<div
			key={post.id}
			className="border dark:border-neutral-900 p-5 rounded-md space-y-4 overflow-hidden"
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
								<div className="dark:text-neutral-400 text-gray-500">
									{post.owner?.userName}
								</div>
							)}
						</div>
					</div>
					<div className="text-xs dark:text-neutral-500 text-gray-500">{`${post.createdAt.toDateString()}`}</div>
				</div>
				<div>
					<CommunityMenu
						items={
							user?.id === post.userId
								? postMenuItemsForOwnPost
								: postMenuItemsFormOthersPost
						}
						icon={<EllipsisVertical className="md:size-5 size-3" />}
					/>
					<DialogDemo
						open={open}
						setIsOpen={setOpen}
						title="edit post"
						description="edit post"
					>
						<CreatePostForm
							post={post}
							communityId={post.community.id}
							setOpen={setOpen}
							mode="edit"
						/>
					</DialogDemo>
				</div>
			</div>
			<div className="text-md md:text-xl dark:text-white text-gray-600">
				{post.title}
			</div>
			<div className="dark:text-neutral-400 text-gray-500 text-sm md:text-base">
				{post.description}
			</div>
			<div className="flex items-center gap-4 select-none">
				<button
					className={`flex items-center gap-4 ${
						hasLiked
							? "text-blue-400"
							: "dark:text-white text-gray-600"
					}`}
					onClick={() => toggleReactionMutation("LIKE")}
				>
					<ThumbsUp /> {likeCount}
				</button>
				<button
					className={`flex items-center gap-4 ${
						hasDisliked
							? "text-red-500"
							: "dark:text-white text-gray-600"
					}`}
					onClick={() => toggleReactionMutation("DISLIKE")}
				>
					<ThumbsDown /> {dislikeCount}
				</button>
				<MessageSquareText
					onClick={() => setOpenComment(!openComment)}
					className="dark:text-white text-gray-600"
				/>{" "}
				{commentsCount}
			</div>
			{openComment && (
				<div className="space-y-4 ">
					<AddCommentForm
						postId={post.id}
						userId={user?.id as string}
					/>
					<div className="space-y-2 overflow-y-scroll scrollbar-hide max-h-[400px]">
						{comments?.length > 0 ? (
							comments?.map(comment => (
								<Comment key={comment.id} comment={comment} />
							))
						) : (
							<NoPosts
								title="Be the first to comment"
								description="Nobody’s responded to this post yet. Share your thoughts and get the conversation started."
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default PostCard;
