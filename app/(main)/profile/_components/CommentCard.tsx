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
		<div className="border dark:border-[#27272A] dark:bg-[#141416] rounded-md p-4 space-y-2">
			<div className="flex items-start gap-2">
				<div className="border dark:border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
					<Handshake
						className={"dark:text-white text-[#18181B]"}
						size={25}
					/>
				</div>
				<div className="text-sm">
					<div className="font-semibold dark:text-[#8B5CF6] text-[#18181B]">
						{comment.post.community?.name}
					</div>
					<div className="dark:text-[#71717A] text-[#A1A1AA]">
						{comment.author?.userName}
					</div>
				</div>
				<Dot />
				<div className="text-sm dark:text-[#71717A] text-[#A1A1AA]">
					{comment.post.title}
				</div>
			</div>
			<div className="dark:text-[#FAFAFA] text-[#18181B]">
				{comment.content}
			</div>
		</div>
	);
};

export default CommentCard;
