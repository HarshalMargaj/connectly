"use client";

import {
	Bookmark,
	BookmarkCheck,
	Dot,
	EllipsisVertical,
	MessageSquareText,
	Pencil,
	ThumbsDown,
	ThumbsUp,
	Trash,
} from "lucide-react";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";

import { CommunityMenu } from "@/components/community-menu";
import NoPosts from "@/components/NotPosts";
import { DialogDemo } from "@/components/reusable-dialog";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";
import CreatePostForm from "./CreatePostForm";

import { toast } from "sonner";
import { useUserSavedPostsQuery } from "@/hooks/useUserSavedPostsQuery";
import { useRouter } from "next/navigation";

type PostWithOwner = Prisma.PostGetPayload<{
	include: {
		owner: true;
		comments: true;
		PostReaction: true;
		community: true;
	};
}>;

type Comment = Prisma.CommentGetPayload<{
	include: {
		author: true;
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
	const queryClient = useQueryClient();
	const router = useRouter();

	const getPostComments = async () => {
		const res = await fetch(`/api/posts/comments/${post.id}`);

		if (!res.ok) {
			toast.error("Failed to fetch comments");
		}

		return res.json();
	};

	const { data: comments = [] } = useQuery({
		queryFn: getPostComments,
		queryKey: ["comments", post.id],
	});

	const toggleReaction = async (type: string) => {
		const res = await fetch(`/api/posts/${post.id}/reaction`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ type }),
		});

		if (!res.ok) {
			toast.error("Failed to react");
		}

		return res.json();
	};

	const { mutate: toggleReactionMutation } = useMutation({
		mutationFn: toggleReaction,

		onMutate: async (type: "LIKE" | "DISLIKE") => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["allPosts"] });

			// Snapshot previous state
			const previousPosts = queryClient.getQueryData<PostWithOwner[]>([
				"allPosts",
			]);

			// Optimistically update
			queryClient.setQueryData<PostWithOwner[] | undefined>(
				["allPosts"],
				(old): PostWithOwner[] | undefined => {
					if (!old) return old;

					return old.map(p => {
						if (p.id !== post.id) return p;

						const filtered = p.PostReaction.filter(
							r => r.userId !== user?.id,
						);

						const alreadyReacted = p.PostReaction.find(
							r => r.userId === user?.id && r.type === type,
						);

						return {
							...p,
							PostReaction: alreadyReacted
								? filtered
								: [
										...filtered,
										{
											id: crypto.randomUUID(),
											type,
											userId: user?.id!,
											postId: p.id,
											createdAt: new Date(), // 👈 IMPORTANT
										},
									],
						};
					});
				},
			);

			return { previousPosts };
		},

		onError: (_err, _vars, context) => {
			// rollback on error
			queryClient.setQueryData(["allPosts"], context?.previousPosts);
			toast.error("Failed to react");
		},

		onSettled: () => {
			// final sync with server
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({
				queryKey: ["posts", post.communityId],
			});
		},
	});

	const deletePost = async () => {
		const res = await fetch(`/api/posts/${post.id}/delete`, {
			method: "DELETE",
		});

		if (!res.ok) {
			toast.error("Failed to delete post");
		}

		return res.json();
	};

	const { mutateAsync: deletePostMutation } = useMutation({
		mutationFn: deletePost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts", post.communityId],
			});
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({
				queryKey: ["userPosts", user?.id],
			});
			queryClient.invalidateQueries({
				queryKey: ["savedPosts", user?.id],
			});

			router.refresh();
		},
	});

	const { data: savedPosts = [] } = useUserSavedPostsQuery({
		userId: user?.id,
	});

	const hasSaved = savedPosts?.find((sp: PostWithOwner) => sp.id === post.id);

	const savePost = async () => {
		const res = await fetch(`/api/posts/${post.id}/save`, {
			method: "POST",
		});

		if (!res.ok) {
			toast.error("Failed to save post");
		}

		return res.json();
	};

	const unsavePost = async () => {
		const res = await fetch(`/api/posts/${post.id}/save`, {
			method: "DELETE",
		});

		if (!res.ok) {
			toast.error("Failed to unsave post");
		}

		return res.json();
	};

	const { mutateAsync: savePostMutation } = useMutation({
		mutationFn: hasSaved ? unsavePost : savePost,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["posts", post.communityId],
			});
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({
				queryKey: ["userPosts", user?.id],
			});
			queryClient.invalidateQueries({
				queryKey: ["savedPosts", user?.id],
			});
			if (hasSaved) {
				toast.success("Post Unsaved");
			} else {
				toast.success("Post saved");
			}
		},
	});

	const likeCount = post.PostReaction.filter(r => r.type === "LIKE").length;
	const dislikeCount = post.PostReaction.filter(
		r => r.type === "DISLIKE",
	).length;
	const commentsCount = post.comments.filter(
		c => c.postId === post.id,
	).length;

	const hasLiked = post.PostReaction.some(
		r => r.type === "LIKE" && r.userId === user?.id,
	);

	const hasDisliked = post.PostReaction.some(
		r => r.type === "DISLIKE" && r.userId === user?.id,
	);

	const postMenuItemsForOwnPost = [
		{
			id: "1",
			name: "Delete",
			action: deletePostMutation,
			icon: <Trash />,
		},
		{
			id: "2",
			name: hasSaved ? "Remove from saved" : "Save",
			action: savePostMutation,
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
			action: savePostMutation,
			icon: <Bookmark />,
		},
	];

	return (
		<div
			key={post.id}
			className="border dark:border-[#27272A] dark:bg-[#141416]  p-5 rounded-md space-y-4 overflow-hidden"
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
							width={35}
							height={35}
							className="rounded-full"
						/>
						<div className="text-sm">
							<div className="flex items-center gap-1">
								{showCommunity ? (
									<div className="font-semibold dark:text-[#8B5CF6] text-[#18181B]">
										{post.community?.name}
									</div>
								) : (
									<div className="dark:text-[#71717A] text-[#18181B]">
										{post.owner?.userName}
									</div>
								)}
								<Dot className="dark:text-[#71717A] text-[#A1A1AA]" />
								<div className="text-xs dark:text-[#71717A] text-[#A1A1AA] ">{`${new Date(
									post.createdAt,
								).toDateString()}`}</div>
							</div>
							{showCommunity && (
								<div className="dark:text-[#71717A] text-[#A1A1AA]">
									{post.owner?.userName}
								</div>
							)}
						</div>
					</div>
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
			<div className="text-md md:text-xl dark:text-[#FAFAFA] text-[#18181B] leading-relaxed">
				{post.title}
			</div>
			<div className="dark:text-[#A1A1AA]  text-[#52525B] text-sm md:text-base leading-relaxed">
				{post.description}
			</div>
			<div className="flex items-center gap-4 select-none">
				<button
					className={`flex items-center gap-4 cursor-pointer `}
					onClick={() => toggleReactionMutation("LIKE")}
				>
					<ThumbsUp
						className={`cursor-pointer transition

    ${hasLiked ? "text-[#22C55E]" : "text-[#18181B] dark:text-white hover:text-[#22C55E] dark:hover:text-[#22C55E]"}`}
					/>

					{likeCount}
				</button>
				<button
					className={`flex items-center gap-4 cursor-pointer `}
					onClick={() => toggleReactionMutation("DISLIKE")}
				>
					<ThumbsDown
						className={`${
							hasDisliked
								? "text-red-500"
								: "dark:text-white text-[#18181B] hover:text-red-500 dark:hover:text-red-500"
						}`}
					/>{" "}
					{dislikeCount}
				</button>
				<MessageSquareText
					onClick={() => setOpenComment(!openComment)}
					className="dark:text-white text-[#18181B] cursor-pointer"
				/>{" "}
				{commentsCount}
			</div>
			{openComment && (
				<div className="space-y-4 ">
					<AddCommentForm postId={post.id} />
					<div className="space-y-2 overflow-y-scroll scrollbar-hide max-h-[400px]">
						{comments?.length > 0 ? (
							comments?.map((comment: Comment) => (
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
