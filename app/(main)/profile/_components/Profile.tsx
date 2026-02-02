"use client";

import React from "react";
import { TabsDemo } from "@/components/profile-tabs";
import { useUser } from "@clerk/nextjs";

const Profile = () => {
	const { user } = useUser();

	return (
		<div>
			<div className="relative">
				<div className="h-[200px] w-full overflow-hidden">
					<img
						src="/profile-banner.jpg"
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="flex items-center absolute md:top-25 p-5 top-34">
					<div className="flex items-end md:gap-4 gap-2">
						<img
							src={user?.imageUrl}
							alt="profile-image"
							className="rounded-full md:w-[130px] md:h-[130px] w-[80px] h-[80px]"
						/>
						<div className="md:text-2xl text-md tracking-wider">
							u/{user?.fullName?.split(" ").join("")}
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
