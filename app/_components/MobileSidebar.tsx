import { Menu } from "lucide-react";
import React, { SetStateAction } from "react";
import Sidebar from "./Sidebar";

interface MobileSidebarProps {
	isSidebarOpen: boolean;
	setIsSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = ({
	setIsSidebarOpen,
	isSidebarOpen,
}: MobileSidebarProps) => {
	return (
		<div className="relative md:hidden h-full">
			<Menu onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
			<div className="fixed top-16 left-0 h-full">
				<Sidebar
					setIsSidebarOpen={setIsSidebarOpen}
					isSidebarOpen={isSidebarOpen}
				/>
			</div>
		</div>
	);
};

export default MobileSidebar;
