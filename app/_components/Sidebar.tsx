"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronDown, House, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogDemo } from "@/components/reusable-dialog";
import CommunityForm from "./CommunityForm";
import { useQuery } from "@tanstack/react-query";

import { get } from "@/actions/get-communities";

export const SidebarItems = [
	{ id: 1, item: "Home", path: "/home", icon: <House /> },
	{ id: 2, item: "Profile", path: "/profile" },
];

const Sidebar = () => {
	const router = useRouter();
	const [selectedItem, setSelectedItem] = useState<number>(1);
	const [visible, setVisible] = useState<boolean>(true);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { data: communities, isLoading } = useQuery({
		queryFn: get,
		queryKey: ["communities"],
	});

	return (
		<div className="w-[300px] border-r dark:border-neutral-900 p-5 space-y-2 select-none">
			{SidebarItems.map(item => (
				<div
					onClick={() => {
						router.push(item.path);
						setSelectedItem(item.id);
					}}
					key={item.id}
					className={` rounded-md p-2 cursor-pointer ${
						selectedItem === item.id
							? "bg-amber-100 text-neutral-800"
							: "hover:bg-amber-100/10"
					} `}
				>
					{item.item}
				</div>
			))}
			<div>
				<div
					onClick={() => setVisible(!visible)}
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
					<div className="p-2 space-y-2 ">
						<Button
							onClick={() => setIsOpen(true)}
							className="w-full hover:bg-amber-100/5 rounded-md"
							variant="ghost"
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
							<CommunityForm />
						</DialogDemo>
						<div>
							{communities?.map(community => (
								<div key={community.id}>{community.name}</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
