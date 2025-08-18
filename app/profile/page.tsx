import React from "react";
import { TabsDemo } from "@/components/profile-tabs";

const profile = () => {
	return (
		<div className="p-5 space-y-4">
			<h1 className="text-3xl font-semibold">My Profile</h1>
			<TabsDemo />
		</div>
	);
};

export default profile;
