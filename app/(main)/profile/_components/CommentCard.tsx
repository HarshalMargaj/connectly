import { Prisma } from "@prisma/client";
import { Dot, Handshake } from "lucide-react";
import React from "react";

type CommentWithAuthor = Prisma.CommentGetPayload<{
	include: { author: true; post: { include: { community: true } } };
}>;

interface CommentCardProps {
	comment: CommentWithAuthor;
}

const CommentCard = ({ comment }: CommentCardProps) => {
	return (
		<div className="border dark:border-neutral-900 rounded-md p-4 space-y-2">
			<div className="flex items-start gap-2">
				<div className="border dark:border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
					<Handshake
						className={"dark:text-amber-100 text-gray-600"}
						size={25}
					/>
				</div>
				<div className="text-sm">
					<div className="font-semibold">
						{comment.post.community?.name}
					</div>
					<div className="dark:text-neutral-400 text-gray-500">
						{comment.author?.userName}
					</div>
				</div>
				<Dot />
				<div className="text-sm dark:text-neutral-500 text-gray-500">
					{comment.post.title}
				</div>
			</div>
			<div className="dark:text-white text-gray-500">
				{comment.content}
			</div>
		</div>
	);
};

export default CommentCard;
