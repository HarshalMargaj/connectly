import { Prisma } from "@prisma/client";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import { useQuery } from "@tanstack/react-query";
import { getCommentsById } from "@/actions/get-comments-by-id";
import Comment from "./Comment";

type PostWithOwner = Prisma.PostGetPayload<{
	include: { owner: true; comments: true };
}>;

interface PostCardProps {
	post: PostWithOwner;
}

const PostCard = ({ post }: PostCardProps) => {
	const [openComment, setOpenComment] = useState<boolean>(false);

	const { data: comments, isLoading } = useQuery({
		queryFn: () => getCommentsById(post.id),
		queryKey: ["comments", post.id],
	});

	return (
		<div
			key={post.id}
			className="border border-neutral-900 p-5 rounded-md space-y-4 max-h-[400px]"
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
				<ThumbsUp /> {post.likes}
				<ThumbsDown /> {post.dislikes}
				<MessageSquareText
					onClick={() => setOpenComment(!openComment)}
				/>{" "}
				{post.comments.length}
			</div>
			{openComment && (
				<div className="space-y-2">
					<AddCommentForm postId={post.id} userId={post.userId} />
					<div className="space-y-2">
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
