import { create } from "zustand";

interface useSidebar {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
	closeSidebar: () => void;
}

export const useSidebar = create<useSidebar>(set => ({
	isSidebarOpen: true,
	toggleSidebar: () =>
		set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
	closeSidebar: () => set({ isSidebarOpen: false }),
}));
