"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronDown, House, Menu, Plus, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogDemo } from "@/components/reusable-dialog";
import CommunityForm from "./CommunityForm";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

import { getByUser } from "@/actions/get-community";
import { getJoinedCommunities } from "@/actions/joined-communities";
import CommunityItem from "./CommunityItem";
import { playSound } from "@/lib/PlaySound";
import { SkeletonDemo } from "@/components/skeletons/YourCommSkeleton";

export const SidebarItems = [
	{ id: 1, item: "Home", path: "/home", icon: <House /> },
	{ id: 2, item: "Profile", path: "/profile" },
	{ id: 3, item: "Communities", path: "/communities" },
];

const Sidebar = () => {
	const { user } = useUser();
	const router = useRouter();
	const [visible, setVisible] = useState<boolean>(true);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	const [selectedItem, setSelectedItem] = useState<string>("1");

	useEffect(() => {
		const storedItem =
			(localStorage.getItem("selectedItem") as string) || "1";
		setSelectedItem(storedItem);
	}, []);

	const { data: communities = [], isLoading } = useQuery({
		queryFn: () => getByUser(user?.id as string),
		queryKey: ["communities", user?.id],
		enabled: !!user?.id,
	});

	const {
		data: joinedCommunities = [],
		isLoading: isJoinedCommunitiesLoading,
	} = useQuery({
		queryFn: () => getJoinedCommunities(user?.id as string),
		queryKey: ["joinedCommunities", user?.id],
		enabled: !!user?.id,
	});

	return (
		<div
			className={`${
				isSidebarOpen ? "w-[300px]" : "w-10"
			} border-r dark:border-neutral-900 p-5 space-y-2 select-none relative transition-all ease-in-out duration-500`}
		>
			<div
				onClick={() => {
					setIsSidebarOpen(!isSidebarOpen);
					playSound();
				}}
				className="absolute top-6 -right-[17px] border border-neutral-700 rounded-full bg-black p-2 hover:bg-neutral-600 cursor-pointer z-10"
			>
				<Menu size={15} />
			</div>
			{isSidebarOpen && (
				<div className="space-y-2">
					{SidebarItems.map(item => (
						<div
							onClick={() => {
								router.push(item.path);
								setSelectedItem(item.id.toString());
								localStorage.setItem(
									"selectedItem",
									item.id.toString()
								);
							}}
							key={item.id}
							className={` rounded-md ${
								item.item === "Profile" && !user?.id
									? "p-0"
									: "p-2"
							} cursor-pointer ${
								selectedItem === item.id.toString()
									? "bg-amber-100 text-neutral-800"
									: "hover:bg-amber-100/10"
							} `}
						>
							{item.item === "Profile" && !user?.id
								? ""
								: item.item}
						</div>
					))}
					<div className="space-y-2">
						<div
							onClick={() => {
								setVisible(!visible);
								playSound();
							}}
							className="p-2 text-sm font-bold text-neutral-600 flex items-center justify-between hover:bg-amber-100/5 rounded-md tracking-wide"
						>
							COMMUNITIES
							<ChevronDown
								size={20}
								className={` cursor-pointer transition-all ease-in-out duration-500 ${
									visible ? "rotate-0" : "rotate-180"
								}`}
							/>
						</div>

						{visible && (
							<div className="space-y-2">
								<Button
									onClick={() => {
										setIsOpen(true);
										playSound();
									}}
									className="w-full hover:bg-amber-100/5 rounded-md"
									variant="outline"
								>
									<Plus />
									Create a Community
								</Button>
								<DialogDemo
									open={isOpen}
									setIsOpen={setIsOpen}
									title="Tell us about your community"
									description="A name and description help people understand what your community is all about."
								>
									<CommunityForm setIsOpen={setIsOpen} />
								</DialogDemo>
								{user?.id && (
									<Button
										className="w-full"
										variant="outline"
										onClick={() => {
											playSound();
											router.push("/managecommunities");
										}}
									>
										<Settings />
										Manage Communities
									</Button>
								)}
								{isLoading ? (
									<div>
										<SkeletonDemo />
									</div>
								) : communities?.length > 0 ? (
									<div className="space-y-2">
										<div className="p-2 text-sm font-bold text-neutral-600 tracking-wide">
											YOUR COMMUNITIES
										</div>
										{communities.map(community => (
											<CommunityItem
												community={community}
												key={community.id}
												selectedItem={selectedItem}
												setSelectedItem={
													setSelectedItem
												}
											/>
										))}
									</div>
								) : null}

								{isJoinedCommunitiesLoading ? (
									<SkeletonDemo />
								) : (
									joinedCommunities?.length > 0 && (
										<div className="space-y-2">
											<div className="p-2 text-sm font-bold text-neutral-600 tracking-wide ">
												JOINED COMMUNITIES
											</div>
											{joinedCommunities?.map(
												community => (
													<CommunityItem
														community={community}
														key={community.id}
														selectedItem={
															selectedItem
														}
														setSelectedItem={
															setSelectedItem
														}
													/>
												)
											)}
										</div>
									)
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
