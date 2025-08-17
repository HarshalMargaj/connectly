import { getCommunityById } from "@/actions/get-comm-by-id";
import { getByComId } from "@/actions/get-communityBySlug";
import { Prisma } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import React from "react";

type PostsWithOwner = Prisma.PostGetPayload<{
	include: { owner: true };
}>;

interface PostProps {
	post: PostsWithOwner;
}

const Post = ({ post }: PostProps) => {
	const { data: community, isLoading } = useQuery({
		queryFn: () => getCommunityById(post.communityId),
		queryKey: ["postCommunity"],
	});

	return (
		<div className="border border-neutral-900 p-4 rounded-md space-y-2">
			<div>
				<div className="flex items-start gap-2">
					<div className="border border-neutral-700 rounded-full p-1 shadow-sm shadow-amber-100/10">
						<Handshake className={"text-amber-100"} size={25} />
					</div>
					<div className="text-sm">
						<div className="font-semibold">{community?.name}</div>
						<div className="text-neutral-400">
							{post.owner?.userName}
						</div>
					</div>
					<div className="text-xs text-neutral-500">{`${post.createdAt.toDateString()} ${post.createdAt.toLocaleTimeString()}`}</div>
				</div>
			</div>
			<div className="space-y-2">
				<div>{post.title}</div>
				<div className="text-neutral-400">{post.description}</div>
			</div>
		</div>
	);
};

export default Post;
