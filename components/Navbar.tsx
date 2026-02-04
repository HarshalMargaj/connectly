"use client";

import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@clerk/nextjs";
import { CommandDialogDemo } from "@/components/search-dialog";
import { playSound } from "@/lib/PlaySound";
import MobileNavbar from "./MobileNavbar";
import MobileSidebar from "./MobileSidebar";
import { useRouter } from "next/navigation";
import { useCommunitiesQuery } from "@/hooks/useCommunitiesQuery";

const Navbar = () => {
	const { user } = useUser();
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const { data: communities } = useCommunitiesQuery();

	return (
		<div className="flex items-center justify-between h-16 border-b dark:border-[#27272A] p-5 md:gap-40 gap-2 dark:bg-[#141416] bg-white">
			<div
				className="flex items-center gap-2 "
				onClick={() => router.push("/")}
			>
				<MobileSidebar />
				<div className="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-lg flex items-center justify-center text-white font-bold text-xl">
					C
				</div>
				<div className="md:text-2xl text-md font-semibold dark:text-white text-[#18181B] ">
					Connectly
				</div>
			</div>

			<div className="flex justify-end items-center  gap-2 md:gap-4">
				<div
					onClick={() => {
						playSound();
						setOpen(!open);
					}}
					className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer px-5 py-2 md:w-[500px] overflow-hidden"
				>
					<div className="text-neutral-400 md:text-base text-xs">
						Search...
					</div>
					<div onClick={e => e.stopPropagation()}>
						<CommandDialogDemo
							open={open}
							setOpen={setOpen}
							communities={communities}
						/>
					</div>
				</div>
				<div className="hidden md:block">
					<ModeToggle />
				</div>
				<SignedOut>
					<Button
						onClick={() => router.push("/sign-in")}
						variant="outline"
						className="px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-lg font-medium hover:from-[#7C3AED] hover:to-[#5B21B6] transition hover:text-white"
					>
						Sign In
					</Button>
				</SignedOut>
				<SignedIn>
					<div className="dark:text-white text-gray-600 hidden md:block">
						u/{user?.fullName?.split(" ").join("")}
					</div>
					<UserButton />
				</SignedIn>
				<MobileNavbar />
			</div>
		</div>
	);
};

export default Navbar;
