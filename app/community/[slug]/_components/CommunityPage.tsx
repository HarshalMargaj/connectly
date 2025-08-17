"use client";

import { joinCommunity } from "@/actions/join-community";
import { getJoinedCommunities } from "@/actions/joined-communities";
import { DialogDemo } from "@/components/reusable-dialog";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/PlaySound";
import { useUser } from "@clerk/nextjs";

import { Community } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Handshake, Plus } from "lucide-react";
import React, { useState } from "react";
import CreatePostForm from "./CreatePostForm";
import PostSection from "./PostSection";
import { CommunityMenu } from "@/components/community-menu";

interface CommunityPageProps {
	community: Community;
}

const CommunityPage = ({ community }: CommunityPageProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { user } = useUser();

	const { data: joinedCommunities } = useQuery({
		queryFn: () => getJoinedCommunities(user?.id as string),
		queryKey: ["joinedCommunities", user?.id],
	});

	const isJoined = joinedCommunities?.find(c => c.id === community.id);

	const { mutate: joinCommunityMutation } = useMutation({
		mutationFn: joinCommunity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["joinedCommunities"] });
			console.log("you have successfully join community");
		},
		onError: () => {
			console.log("error joining community");
		},
	});

	return (
		<div className="relative">
			<div className="h-[200px] w-full overflow-hidden">
				<img
					src="/banner.avif"
					alt={community.name}
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="flex items-center absolute top-25 p-5">
				<div className="flex items-end gap-4 ">
					<div className="border border-neutral-700 rounded-full p-4 shadow-sm shadow-amber-100/10 bg-neutral-800 flex items-center justify-center">
						<Handshake className="text-amber-100" size={100} />
					</div>
					<div className="text-2xl tracking-wider">
						{community.name}
					</div>
				</div>
			</div>
			<div className="flex items-center justify-end p-5 gap-2">
				<Button
					onClick={() => {
						playSound();
						setOpen(true);
					}}
					variant="outline"
					className="rounded-4xl"
					disabled={!isJoined && user?.id !== community.userId}
				>
					<Plus /> Create Post
				</Button>
				<DialogDemo
					open={open}
					setIsOpen={setOpen}
					title="Create Post"
					description={`Create post in ${community.name}`}
				>
					<CreatePostForm
						communityId={community.id}
						setOpen={setOpen}
					/>
				</DialogDemo>
				{community.userId !== user?.id && (
					<Button
						onClick={() => {
							joinCommunityMutation(community.id);
							playSound();
						}}
						className="bg-amber-100 rounded-4xl"
						disabled={isJoined && true}
					>
						{isJoined ? "Joined" : "Join"}
					</Button>
				)}
				{isJoined && <CommunityMenu communityId={community.id} />}
			</div>
			<div className="p-5 pb-20">
				<PostSection communityId={community.id} />
			</div>
		</div>
	);
};

export default CommunityPage;
