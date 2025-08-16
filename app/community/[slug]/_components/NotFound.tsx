import Image from "next/image";
import React from "react";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center py-10 text-center">
			<Image
				src="/snoo_wave.png"
				alt="notfound"
				width={100}
				height={100}
				className="mb-4"
			/>
			<p className="text-lg font-semibold">Be the first to comment</p>
			<p className="text-muted-foreground max-w-sm">
				Nobody’s responded to this post yet. Share your thoughts and get
				the conversation started.
			</p>
		</div>
	);
};

export default NotFound;
