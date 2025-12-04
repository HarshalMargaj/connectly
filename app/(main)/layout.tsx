import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/lib/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import Navbar from "../_components/Navbar";
import Sidebar from "../_components/Sidebar";

const mainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider>
			<QueryProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<main className="flex h-full" suppressHydrationWarning>
						<Sidebar />
						<div className="flex-1 overflow-y-auto">{children}</div>
					</main>
				</ThemeProvider>
			</QueryProvider>
		</ClerkProvider>
	);
};

export default mainLayout;
