"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
				<Button
					variant="outline"
					size="icon"
					className="rounded-full md:p-1 p-0"
				>
					{icon}
				</Button>
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
