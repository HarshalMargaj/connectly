import { ModeToggle } from "@/components/mode-toggle";
import { Ellipsis } from "lucide-react";
import React, { RefObject, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const MobileNavbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	const closeDropdown = () => {
		setIsOpen(false);
	};

	useOnClickOutside(ref as RefObject<HTMLElement>, closeDropdown);

	return (
		<div className="relative md:hidden" ref={ref}>
			<Ellipsis onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<div className="absolute top-10 right-1 bg-neutral-900 p-2 rounded-md w-[200px]">
					<div className="flex items-center justify-between">
						<div className="text-sm">Theme</div>
						<ModeToggle />
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileNavbar;
