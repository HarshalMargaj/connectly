import React from "react";

import HomePage from "./_components/HomePage";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home | Connectly",
	description: "...",
};

const home = () => {
	return <HomePage />;
};

export default home;
