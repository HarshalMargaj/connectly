import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./_components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "./_components/Sidebar";
import QueryProvider from "@/lib/query-provider";
import { ensureUserExists } from "@/actions/user";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Connectly",
	description: "Build by Harshal Margaj",
	icons: {
		icon: "/favicon.png",
		shortcut: "/favicon.png",
		apple: "/favicon.png",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	await ensureUserExists();

	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden dark:bg-neutral-950`}
				suppressHydrationWarning
			>
				<ClerkProvider>
					<QueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Navbar />
							<main className="flex h-full">
								<Sidebar />
								<div className="flex-1 overflow-y-auto">
									{children}
								</div>
							</main>
						</ThemeProvider>
					</QueryProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
