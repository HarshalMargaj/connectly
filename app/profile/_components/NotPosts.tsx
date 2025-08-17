import Image from "next/image";
import React from "react";

const NoPosts = () => {
	return (
		<div className="flex flex-col items-center justify-center py-10 text-center h-full">
			<Image
				src="/snoo_wave.png"
				alt="no-posts"
				width={100}
				height={100}
				className="mb-4 opacity-80"
			/>
			<p className="text-lg font-semibold">No posts yet</p>
			<p className="text-muted-foreground max-w-sm">
				Looks like you haven’t shared anything yet. Start creating posts
				to share your thoughts with the community!
			</p>
		</div>
	);
};

export default NoPosts;
