import { getPostsById } from "@/actions/get-posts-by-id";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard from "./PostCard";

interface PostSectionProps {
	communityId: string;
}

const PostSection = ({ communityId }: PostSectionProps) => {
	const { data: posts, isLoading } = useQuery({
		queryFn: () => getPostsById(communityId),
		queryKey: ["posts", communityId],
	});

	return (
		<div className="space-y-2">
			{posts?.map(post => (
				<PostCard
					key={post.id}
					post={post}
					showUser={true}
					showCommunity={false}
				/>
			))}
		</div>
	);
};

export default PostSection;
