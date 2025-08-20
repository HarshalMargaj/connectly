"use client";

import React from "react";
import { TabsDemo } from "@/components/profile-tabs";
import { useUser } from "@clerk/nextjs";

const Profile = () => {
	const { user } = useUser();

	return (
		<div className=" ">
			<div className="relative">
				<div className="h-[200px] w-full overflow-hidden">
					<img
						src="/profile-banner.jpg"
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="flex items-center absolute top-25 p-5">
					<div className="flex items-end gap-4 ">
						<img
							src={user?.imageUrl}
							alt="profile-image"
							width={130}
							height={130}
							className="rounded-full"
						/>
						<div className="text-2xl tracking-wider">
							u/{user?.firstName}
						</div>
					</div>
				</div>
			</div>
			<div className="p-5 mt-20 space-y-4">
				<TabsDemo />
			</div>
		</div>
	);
};

export default Profile;
