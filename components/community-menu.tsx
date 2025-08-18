// "use client";

// import * as React from "react";
// import { Ellipsis } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { leaveCommunity } from "@/actions/leave-community";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface CommunityMenuProps {
// 	communityId: string;
// 	children: React.ReactNode;
// }

// export function CommunityMenu({ communityId, children }: CommunityMenuProps) {
// 	const queryClient = useQueryClient();
// 	const { mutateAsync: leaveCommunityMutation } = useMutation({
// 		mutationFn: leaveCommunity,
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["joinedcommunities"] });
// 			queryClient.invalidateQueries({ queryKey: ["joinedCommunities"] });
// 		},
// 		onError: error => {
// 			console.log(error);
// 		},
// 	});

// 	return (
// 		<DropdownMenu>
// 			<DropdownMenuTrigger asChild>
// 				<Button variant="outline" size="icon" className="rounded-full">
// 					<Ellipsis />
// 				</Button>
// 			</DropdownMenuTrigger>
// 			<DropdownMenuContent align="end">
// 				<DropdownMenuItem
// 					onClick={() => leaveCommunityMutation(communityId)}
// 				>
// 					Leave Community
// 				</DropdownMenuItem>
// 			</DropdownMenuContent>
// 		</DropdownMenu>
// 	);
// }
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
	items: { id: string; name: string; action: () => void }[];
}

export function CommunityMenu({ icon, items }: CommunityMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="rounded-full">
					{icon}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{items?.map(item => (
					<DropdownMenuItem onClick={item.action} key={item.id}>
						{item.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
