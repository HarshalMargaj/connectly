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
					<div className="h-screen flex flex-col">
						<Navbar />
						<div
							className="flex flex-1 overflow-hidden"
							suppressHydrationWarning
						>
							<div className="hidden md:block">
								<Sidebar />
							</div>
							<main className="flex-1 overflow-y-auto">
								{children}
							</main>
						</div>
					</div>
				</ThemeProvider>
			</QueryProvider>
		</ClerkProvider>
	);
};

export default mainLayout;
