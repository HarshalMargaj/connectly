import React from "react";
import CommunitiesPage from "./_components/CommunitiesPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Communities | Connectly",
	description: "...",
};

const page = () => {
	return <CommunitiesPage />;
};

export default page;
