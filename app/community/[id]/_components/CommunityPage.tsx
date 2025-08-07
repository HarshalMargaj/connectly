import { Button } from "@/components/ui/button";
import { Community } from "@prisma/client";
import { Handshake, Plus } from "lucide-react";
import React from "react";

interface CommunityPageProps {
	community: Community;
}

const CommunityPage = ({ community }: CommunityPageProps) => {
	return (
		<div className="w-full relative">
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
					<div className="text-2xl">{community.name}</div>
				</div>
			</div>
			<div className="flex items-center justify-end p-5 gap-4">
				<Button variant="outline" className="rounded-4xl">
					<Plus /> Create Post
				</Button>
				<Button className="bg-amber-100 rounded-4xl">Join</Button>
			</div>
		</div>
	);
};

export default CommunityPage;
