import Image from "next/image";
import React from "react";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center py-10 text-center h-[500px]">
			<Image
				src="/snoo_wave.png"
				alt="notfound"
				width={100}
				height={100}
				className="mb-4"
			/>
			<p className="text-lg font-semibold">
				You haven’t joined any communities yet
			</p>
			<p className="text-muted-foreground max-w-sm">
				Explore communities that interest you and join to see them here.
			</p>
		</div>
	);
};

export default NotFound;
