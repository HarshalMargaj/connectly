import React from "react";
import CommunitiesPage from "./_components/CommunitiesPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Communities | Connectly",
	description: "...",
};

const page = () => {
	return (
		<div>
			<h1 className="text-3xl font-semibold p-5">Communities</h1>
			<CommunitiesPage />
		</div>
	);
};

export default page;
