"use client";

import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/lib/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React, { useState } from "react";
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

const mainLayout = ({ children }: { children: React.ReactNode }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	return (
		<ClerkProvider>
			<QueryProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar
						setIsSidebarOpen={setIsSidebarOpen}
						isSidebarOpen={isSidebarOpen}
					/>
					<main className="flex h-full" suppressHydrationWarning>
						<div className="hidden md:block">
							<Sidebar
								isSidebarOpen={isSidebarOpen}
								setIsSidebarOpen={setIsSidebarOpen}
							/>
						</div>
						<div className="flex-1 overflow-y-auto">{children}</div>
					</main>
				</ThemeProvider>
			</QueryProvider>
		</ClerkProvider>
	);
};

export default mainLayout;
