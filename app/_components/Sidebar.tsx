"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const SidebarItems = [
	{ id: 1, item: "Home", path: "/home" },
	{ id: 2, item: "Communities", path: "/" },
	{ id: 3, item: "Profile", path: "/profile" },
];

const Sidebar = () => {
	const router = useRouter();

	return (
		<div className="w-[300px] border-r dark:border-neutral-700">
			{SidebarItems.map(item => (
				<div onClick={() => router.push(item.path)} key={item.id}>
					{item.item}
				</div>
			))}
		</div>
	);
};

export default Sidebar;
