"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	ChevronDown,
	Globe,
	House,
	Menu,
	Plus,
	Settings,
	User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogDemo } from "@/components/reusable-dialog";
import CommunityItem from "./CommunityItem";
import CommunityForm from "./CommunityForm";
import { playSound } from "@/lib/PlaySound";
import { SkeletonDemo } from "@/components/skeletons/YourCommSkeleton";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { useSidebar } from "@/store/sidebar.store";

type Community = Prisma.CommunityGetPayload<{
	include: {
		joinedBy: true;
	};
}>;

export const SidebarItems = [
	{ id: 1, item: "Home", path: "/home", icon: <House /> },
	{ id: 2, item: "Profile", path: "/profile", icon: <User /> },
	{ id: 3, item: "Communities", path: "/communities", icon: <Globe /> },
];

const Sidebar = () => {
	const { user } = useUser();
	const router = useRouter();
	const [visible, setVisible] = useState<boolean>(true);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const isSidebarOpen = useSidebar(state => state.isSidebarOpen);
	const toggleSidebar = useSidebar(state => state.toggleSidebar);
	const pathname = usePathname();

	const getUserCommunities = async () => {
		const res = await fetch(`/api/communities/own`);

		if (!res.ok) {
			toast.error("Failed to fetch user communities");
		}

		return res.json();
	};

	const getUserJoinedCommunities = async () => {
		const res = await fetch(`/api/communities/joined`);

		if (!res.ok) {
			toast.error("Failed to fetch user joined communities");
		}

		return res.json();
	};

	const { data: communities = [], isLoading } = useQuery({
		queryFn: getUserCommunities,
		queryKey: ["communities", user?.id],
		enabled: !!user?.id,
	});

	const {
		data: joinedCommunities = [],
		isLoading: isJoinedCommunitiesLoading,
	} = useQuery({
		queryFn: getUserJoinedCommunities,
		queryKey: ["joinedCommunities", user?.id],
		enabled: !!user?.id,
	});

	return (
		<div className="relative ">
			<div
				onClick={e => e.preventDefault()}
				className={`
					 h-screen
					border-r dark:border-[#27272A]
					p-5 pb-20 space-y-2 select-none 
					transition-transform duration-300 ease-in-out dark:bg-[#141416]  bg-white
					${isSidebarOpen ? "md:w-[300px]" : "md:w-8"} w-[300px]
					${
						isSidebarOpen ? "translate-x-0" : "-translate-x-full"
					} md:static md:translate-x-0 overflow-y-auto overflow-x-hidden
				`}
			>
				{isSidebarOpen && (
					<div className="space-y-2">
						{SidebarItems.map(item => {
							const isActive = pathname === item.path;

							return (
								<div
									onClick={() => {
										router.push(item.path);
									}}
									key={item.id}
									className={` rounded-md text-[#18181B] flex items-center gap-2  ${
										item.item === "Profile" && !user?.id
											? "p-0"
											: "p-2"
									} cursor-pointer ${
										isActive
											? "bg-neutral-200 dark:text-[#8B5CF6] dark:bg-[#8B5CF6]/15 text-neutral-800"
											: "dark:hover:bg-[#8B5CF6]/5 dark:text-white hover:bg-neutral-100"
									} `}
								>
									{item.item === "Profile" && !user?.id
										? ""
										: item.icon}
									{item.item === "Profile" && !user?.id
										? ""
										: item.item}
								</div>
							);
						})}
						<div className="space-y-2">
							<div
								onClick={() => {
									setVisible(!visible);
									playSound();
								}}
								className="p-2 text-sm font-bold text-[#18181B] dark:text-white flex items-center justify-between hover:bg-amber-100/10 rounded-md tracking-wide"
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
												router.push(
													"/managecommunities",
												);
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
											<div className="p-2 text-sm font-bold text-[#18181B] dark:text-white tracking-wide">
												YOUR COMMUNITIES
											</div>
											{communities.map(
												(community: Community) => (
													<CommunityItem
														community={community}
														key={community.id}
													/>
												),
											)}
										</div>
									) : null}

									{isJoinedCommunitiesLoading ? (
										<SkeletonDemo />
									) : (
										joinedCommunities?.joinedCommunities
											?.length > 0 && (
											<div className="space-y-2">
												<div className="p-2 text-sm font-bold text-[#18181B] dark:text-white tracking-wide">
													JOINED COMMUNITIES
												</div>
												{joinedCommunities?.joinedCommunities?.map(
													(community: Community) => (
														<CommunityItem
															community={
																community
															}
															key={community.id}
														/>
													),
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
			<div
				onClick={() => {
					toggleSidebar();
					playSound();
				}}
				className="md:block hidden absolute top-6 -right-[17px] border  dark:border-[#27272A] rounded-full dark:bg-[#141416] bg-white p-2 dark:hover:bg-neutral-600 hover:bg-neutral-100 cursor-pointer z-50"
			>
				<Menu size={15} />
			</div>
		</div>
	);
};

export default Sidebar;
