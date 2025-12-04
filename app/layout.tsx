import type { Metadata } from "next";
import "./globals.css";
import { ensureUserExists } from "@/actions/user";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "600"],
	variable: "--font-poppins",
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
				className={`${poppins.variable} font-heading antialiased h-full overflow-hidden dark:bg-neutral-950`}
				suppressHydrationWarning
			>
				{children}
			</body>
		</html>
	);
}
