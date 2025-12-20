import { ModeToggle } from "@/components/mode-toggle";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";

const MobileNavbar = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="relative md:hidden">
			<Ellipsis onClick={() => setIsOpen(!isOpen)} />
			{isOpen && (
				<div className="absolute top-10 right-1 bg-neutral-900 p-2 rounded-md w-[200px] z-20">
					<div className="flex items-center justify-between">
						<div className="text-sm">Theme</div>
						<ModeToggle setIsOpen={setIsOpen} />
					</div>
				</div>
			)}
		</div>
	);
};

export default MobileNavbar;
