import { Comment, Prisma } from "@prisma/client";
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
		<div className="border border-neutral-900 rounded-md p-4 space-y-2">
			<div className="flex items-start gap-2">
				<div className="border border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
					<Handshake className={"text-amber-100"} size={25} />
				</div>
				<div className="text-sm">
					<div className="font-semibold">
						{comment.post.community?.name}
					</div>
					<div className="text-neutral-400">
						{comment.author?.userName}
					</div>
				</div>
				<Dot />
				<div className="text-sm text-neutral-500">
					{comment.post.title}
				</div>
			</div>
			<div>{comment.content}</div>
		</div>
	);
};

export default CommentCard;
