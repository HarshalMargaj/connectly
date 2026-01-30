import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider>
			<div className="h-full flex items-center justify-center">
				{children}
			</div>
		</ClerkProvider>
	);
};

export default layout;
