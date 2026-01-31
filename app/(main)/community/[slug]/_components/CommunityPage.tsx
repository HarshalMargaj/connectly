"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

import { Ellipsis, OctagonMinus, Handshake, Plus } from "lucide-react";

import { Prisma } from "@prisma/client";
import CreatePostForm from "./CreatePostForm";
import PostSection from "./PostSection";
import { CommunityMenu } from "@/components/community-menu";
import AboutCommunity from "./AboutCommunity";
import { DialogDemo } from "@/components/reusable-dialog";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/PlaySound";
import { toast } from "sonner";

type CommunityWithJoinedByUsers = Prisma.CommunityGetPayload<{
	include: { joinedBy: true; posts: true };
}>;
interface CommunityPageProps {
	community: CommunityWithJoinedByUsers;
}

const CommunityPage = ({ community }: CommunityPageProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const queryClient = useQueryClient();
	const { user } = useUser();

	const getUserJoinedCommunities = async () => {
		const res = await fetch(`/api/communities/joined?userId=${user?.id}`);

		if (!res.ok) {
			toast.error("Failed to fetch user joined communities");
		}

		return res.json();
	};

	const { data: joinedCommunities } = useQuery({
		queryFn: getUserJoinedCommunities,
		queryKey: ["joinedCommunities", user?.id],
	});

	const isJoined = joinedCommunities?.joinedCommunities?.find(
		(c: CommunityWithJoinedByUsers) => c.id === community.id,
	);

	const joinCommunity = async ({
		userId,
		communityId,
	}: {
		userId: string;
		communityId: string;
	}) => {
		const res = await fetch("/api/communities/join", {
			method: "POST",
			body: JSON.stringify({ userId, communityId }),
		});

		if (!res.ok) {
			toast.error("Failed to join community");
		}

		return res.json();
	};

	const { mutate: joinCommunityMutation } = useMutation({
		mutationFn: joinCommunity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["joinedCommunities"] });
			queryClient.invalidateQueries({ queryKey: ["joinedcommunities"] });
			queryClient.invalidateQueries({ queryKey: ["community"] });
		},
	});

	const leaveCommunity = async ({
		userId,
		communityId,
	}: {
		userId: string;
		communityId: string;
	}) => {
		const res = await fetch("/api/communities/leave", {
			method: "DELETE",
			body: JSON.stringify({ userId, communityId }),
		});

		if (!res.ok) {
			toast.error("Failed to leave community");
		}

		return res.json();
	};

	const { mutateAsync: leaveCommunityMutation } = useMutation({
		mutationFn: leaveCommunity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["joinedcommunities"] });
			queryClient.invalidateQueries({ queryKey: ["joinedCommunities"] });
			queryClient.invalidateQueries({ queryKey: ["community"] });
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
			<div className="flex items-center absolute md:top-25 top-30 p-5">
				<div className="flex items-end gap-4 ">
					<div className="dark:border dark:border-neutral-700 rounded-full p-4 shadow-sm shadow-amber-100/10 bg-neutral-800   flex items-center justify-center">
						<Handshake className="text-amber-100 md:size-[100px] size-[60px]" />
					</div>
					<div className="md:text-2xl text-md tracking-wider">
						{community.name}
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between md:justify-end p-5 mt-10 md:mt-0 gap-2">
				<div className="flex items-center gap-1">
					<Button
						onClick={() => {
							playSound();
							setOpen(true);
						}}
						variant="outline"
						className="rounded-4xl text-xs md:text-sm"
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
							mode="create"
						/>
					</DialogDemo>
					{community.userId !== user?.id && (
						<Button
							onClick={() => {
								if (user?.id && community.id) {
									joinCommunityMutation({
										userId: user?.id,
										communityId: community.id,
									});
								}
								playSound();
							}}
							className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white font-medium hover:from-[#7C3AED] hover:to-[#5B21B6] transition hover:text-white rounded-4xl"
							disabled={isJoined && true}
						>
							{isJoined ? "Joined" : "Join"}
						</Button>
					)}
				</div>
				{isJoined && (
					<CommunityMenu
						icon={<Ellipsis />}
						items={[
							{
								id: "1",
								name: "Leave Community",
								action: () => {
									if (user?.id && community?.id) {
										leaveCommunityMutation({
											userId: user.id,
											communityId: community.id,
										});
									}
								},
								icon: <OctagonMinus />,
							},
						]}
					/>
				)}
			</div>
			<div className="p-5 flex md:flex-row  gap-4 items-start flex-col-reverse">
				{community?.posts.length > 0 && (
					<div className=" w-full">
						<PostSection communityId={community.id} />
					</div>
				)}
				<div
					className={`${
						community?.posts.length === 0
							? "w-full"
							: "md:w-[30%] w-full"
					} border p-4 rounded-md dark: dark:bg-[#141416] bg-neutral-100 md:sticky md:top-0`}
				>
					<AboutCommunity community={community} />
				</div>
			</div>
		</div>
	);
};

export default CommunityPage;
