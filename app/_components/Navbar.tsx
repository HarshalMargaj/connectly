import React from "react";
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between h-16 border-b dark:border-neutral-700 p-5">
			<div className="text-2xl font-bold text-neutral-800 dark:text-amber-100">
				Connectly
			</div>
			<div className="flex justify-end items-center  gap-4 ">
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
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};

export default Navbar;
