"use client";

import React, { useState } from "react";
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@clerk/nextjs";
import { CommandDialogDemo } from "@/components/search-dialog";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/actions/get-communities";
import { playSound } from "@/lib/PlaySound";

const Navbar = () => {
	const { user } = useUser();
	const [open, setOpen] = useState<boolean>(false);

	const { data: communities } = useQuery({
		queryFn: get,
		queryKey: ["allcom"],
	});

	return (
		<div className="flex items-center justify-between h-16 border-b dark:border-neutral-900 p-5 gap-40">
			<div className="text-2xl font-bold text-neutral-800 dark:text-amber-100">
				Connectly
			</div>

			<div className="flex justify-end items-center  gap-4 ">
				<div
					onClick={() => {
						playSound();
						setOpen(!open);
					}}
					className="border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer p-2 w-[250px]"
				>
					<div className="text-neutral-400">
						Search Communities...
					</div>
					<div onClick={e => e.stopPropagation()}>
						<CommandDialogDemo
							open={open}
							setOpen={setOpen}
							communities={communities}
						/>
					</div>
				</div>

				<ModeToggle />
				<SignedOut>
					<SignInButton>
						<Button variant="outline">Sign In</Button>
					</SignInButton>
					<SignUpButton>
						<Button>Sign Up</Button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<div className="text-amber-100">
						u/{user?.fullName?.split(" ").join("")}
					</div>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};

export default Navbar;
