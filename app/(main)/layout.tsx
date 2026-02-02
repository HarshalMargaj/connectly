import QueryProvider from "@/lib/query-provider";

import React from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ensureUserExists } from "@/actions/user";

const mainLayout = async ({ children }: { children: React.ReactNode }) => {
	await ensureUserExists();
	return (
		<QueryProvider>
			<div className="h-screen flex flex-col">
				<Navbar />
				<div
					className="flex flex-1 overflow-hidden"
					suppressHydrationWarning
				>
					<div className="hidden md:block ">
						<Sidebar />
					</div>
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</QueryProvider>
	);
};

export default mainLayout;
