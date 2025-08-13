import { Prisma } from "@prisma/client";
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
			className="border border-neutral-900 p-5 rounded-md space-y-2"
		>
			<div className="flex items-center gap-2 ">
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
			<div>{post.description}</div>
		</div>
	);
};

export default PostCard;
