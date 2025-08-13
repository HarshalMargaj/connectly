import { getPostsById } from "@/actions/get-posts-by-id";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Post } from "@prisma/client";

interface PostSectionProps {
	communityId: string;
}

const PostSection = ({ communityId }: PostSectionProps) => {
	const { data: posts, isLoading } = useQuery({
		queryFn: () => getPostsById(communityId),
		queryKey: ["posts", communityId],
	});

	console.log(posts);

	return (
		<div className="space-y-2">
			{posts?.map(post => (
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
			))}
		</div>
	);
};

export default PostSection;
