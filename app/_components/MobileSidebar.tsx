import { Menu } from "lucide-react";
import React from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "@/store/sidebar.store";

const MobileSidebar = () => {
	const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

	return (
		<div className="md:hidden" onClick={e => e.stopPropagation()}>
			<Menu onClick={toggleSidebar} className="cursor-pointer" />

			{/* OVERLAY */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-transparent z-40"
					onClick={closeSidebar}
				/>
			)}

			{/* SIDEBAR */}
			<div className="fixed top-16 left-0 h-full z-50">
				<Sidebar />
			</div>
		</div>
	);
};

export default MobileSidebar;
