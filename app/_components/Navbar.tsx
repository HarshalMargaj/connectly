"use client";

import React, { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@clerk/nextjs";
import { CommandDialogDemo } from "@/components/search-dialog";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/actions/get-communities";
import { playSound } from "@/lib/PlaySound";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import MobileSidebar from "./MobileSidebar";
import { useRouter } from "next/navigation";

const Navbar = () => {
	const { user } = useUser();
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const { data: communities } = useQuery({
		queryFn: get,
		queryKey: ["allcom"],
	});

	return (
		<div className="flex items-center justify-between h-16 border-b dark:border-neutral-900 p-5 md:gap-40 gap-2">
			<div
				className="flex items-center gap-2 "
				onClick={() => router.push("/")}
			>
				<MobileSidebar />
				<Image
					src="/favicon.png"
					alt="app-logo"
					width={32}
					height={32}
					className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
				/>
				<div className="md:text-2xl text-md font-semibold dark:text-amber-100 text-neutral-900">
					Connectly
				</div>
			</div>

			<div className="flex justify-end items-center  gap-2 md:gap-4">
				<div
					onClick={() => {
						playSound();
						setOpen(!open);
					}}
					className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer p-2 md:w-[250px] max-w-[200px] overflow-hidden"
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

				<Button
					onClick={() => router.push("/sign-in")}
					variant="outline"
					className="text-xs p-2 md:text-sm md:p-4"
				>
					Sign In
				</Button>
				<SignedIn>
					<div className="dark:text-amber-100 text-gray-600 hidden md:block">
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
