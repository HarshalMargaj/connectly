import { Menu } from "lucide-react";
import React from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "@/store/sidebar.store";

const MobileSidebar = () => {
	const toggleSidebar = useSidebar(state => state.toggleSidebar);

	return (
		<div className="relative md:hidden h-full">
			<Menu onClick={() => toggleSidebar()} />
			<div className="fixed top-16 left-0 h-full z-20">
				<Sidebar />
			</div>
		</div>
	);
};

export default MobileSidebar;
