import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full flex items-center justify-center dark:bg-gradient-to-br dark:from-purple-950 dark:via-slate-900 dark:to-blue-950 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
			{children}
		</div>
	);
};

export default layout;
