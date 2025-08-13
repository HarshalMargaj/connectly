import { Prisma } from "@prisma/client";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

type PostWithOwner = Prisma.PostGetPayload<{
	include: { owner: true };
}>;

interface PostCardProps {
	post: PostWithOwner;
}

const PostCard = ({ post }: PostCardProps) => {
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
			<div className="flex items-center gap-4">
				<ThumbsUp /> 100
				<ThumbsDown /> 10
				<MessageSquareText /> 100
			</div>
		</div>
	);
};

export default PostCard;
