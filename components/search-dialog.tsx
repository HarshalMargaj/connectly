"use client";

import * as React from "react";

import {
	CommandDialog,
	CommandEmpty,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import type { Community } from "@prisma/client";
import { useRouter } from "next/navigation";

interface CommandDialogDemoProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	communities: Community[] | undefined;
}

export function CommandDialogDemo({
	open,
	setOpen,
	communities,
}: CommandDialogDemoProps) {
	const router = useRouter();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen(open => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<p className="text-muted-foreground text-sm">
				<kbd className="flex gap-2 items-center">
					<span className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
						⌘
					</span>
					<span className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
						J
					</span>
				</kbd>
			</p>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{communities?.map(community => (
						<CommandItem
							onSelect={() => {
								setOpen(false);
								router.push(`/community/${community.id}`);
							}}
							key={community.id}
							className="m-2 cursor-pointer"
						>
							{community.name}
						</CommandItem>
					))}
				</CommandList>
			</CommandDialog>
		</>
	);
}
