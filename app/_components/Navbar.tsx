import React from "react";
import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const Navbar = () => {
	return (
		<div className="flex items-center justify-between h-16 border-b border-neutral-200 p-4">
			<div className="text-2xl font-bold text-neutral-800">Connectly</div>
			<div className="flex justify-end items-center  gap-4 ">
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
