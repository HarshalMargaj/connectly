"use client";

import * as React from "react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CommunityMenuProps {
	icon: React.ReactNode;
	items: {
		id: string;
		name: string;
		action: () => void;
		icon: React.ReactNode;
	}[];
}

export function CommunityMenu({ icon, items }: CommunityMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="hover:rounded-md dark:hover:bg-[#1C1C1F] hover:bg-neutral-100 text-[#71717A] h-8 w-8 md:p-1 p-0 flex items-center justify-center cursor-pointer transition">
					{icon}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{items?.map(item => (
					<DropdownMenuItem
						onClick={item.action}
						className="cursor-pointer"
						key={item.id}
					>
						{item.icon}
						{item.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
