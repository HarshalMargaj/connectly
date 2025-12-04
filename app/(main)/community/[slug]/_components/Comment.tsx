import type { Comment as PrismaComment, User } from "@prisma/client";
import React from "react";

interface CommentProps {
	comment: PrismaComment & { author: User };
}

const Comment = ({ comment }: CommentProps) => {
	return (
		<div className="border dark:border-neutral-900 p-2 rounded-md space-y-2">
			<div className="flex items-center gap-2">
				<div>
					<img
						src={comment.author.userImage}
						alt={comment.author.userName}
						width={25}
						height={25}
						className="rounded-full"
					/>
				</div>
				<div className="text-blue-400">{comment.author.userName}</div>
				<div className="text-xs dark:text-neutral-500 text-gray-500">{`${comment.createdAt.toDateString()} ${comment.createdAt.toLocaleTimeString()}`}</div>
			</div>
			<div className="text-gray-600 dark:text-white">
				{comment.content}
			</div>
		</div>
	);
};

export default Comment;
