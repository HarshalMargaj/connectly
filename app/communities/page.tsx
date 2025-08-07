"use client";

import { get } from "@/actions/get-communities";
import { useQuery } from "@tanstack/react-query";
import { Handshake } from "lucide-react";
import React from "react";

const page = () => {
	const { data: communities, isLoading } = useQuery({
		queryFn: get,
		queryKey: ["allCommunities"],
	});

	return (
		<div className="p-5 grid grid-cols-4 h-full gap-4">
			{communities?.map(community => (
				<div
					key={community.id}
					className="border border-neutral-700 p-4 rounded-md max-h-[80px] flex items-center gap-2"
				>
					<div className="border border-neutral-700 rounded-full p-2 shadow-sm shadow-amber-100/10">
						<Handshake className="text-amber-100" />
					</div>
					<div>
						<div className="cursor-pointer hover:border-b hover:border-neutral-700 text-sm">
							{community.name}
						</div>
						<div className="text-sm text-neutral-600 line-clamp-1 truncate">
							{community.description}
						</div>
						<div className="text-sm text-neutral-600">
							0 Members
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default page;
