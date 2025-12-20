"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModeToggleProps {
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModeToggle({ setIsOpen }: ModeToggleProps) {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onSelect={() => {
						setTheme("light");
						setIsOpen?.(false);
					}}
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={() => {
						setTheme("dark");
						setIsOpen?.(false);
					}}
				>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={() => {
						setTheme("system");
						setIsOpen?.(false);
					}}
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
