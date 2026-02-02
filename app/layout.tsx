import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Rubik } from "next/font/google";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

const rubik = Rubik({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-rubik",
});

export const metadata: Metadata = {
	title: "Connectly",
	description: "Build by Harshal Margaj",
	icons: {
		icon: "/icon.png",
		shortcut: "/icon.png",
		apple: "/icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" className="h-full" suppressHydrationWarning>
				<body
					className={`${rubik.variable} font-heading antialiased h-full overflow-hidden`}
					suppressHydrationWarning
				>
					<Toaster />
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
		</ClerkProvider>
	);
}
