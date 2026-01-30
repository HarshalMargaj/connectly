import type { Metadata } from "next";
import "./globals.css";
import { ensureUserExists } from "@/actions/user";
import { ThemeProvider } from "@/components/theme-provider";
import { Rubik } from "next/font/google";

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-rubik",
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
				className={`${rubik.variable} font-heading antialiased h-full overflow-hidden dark:bg-neutral-950`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
