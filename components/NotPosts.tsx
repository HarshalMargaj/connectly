import Image from "next/image";
import React from "react";

interface NoPostsProps {
	title: string;
	description: string;
}

const NoPosts = ({ title, description }: NoPostsProps) => {
	return (
		<div className="flex flex-col items-center justify-center py-10 text-center h-full">
			<Image
				src="/snoo_wave.png"
				alt="no-posts"
				width={100}
				height={100}
				className="mb-4 opacity-80"
			/>
			<p className="text-lg font-semibold">{title}</p>
			<p className="text-muted-foreground max-w-sm">{description}</p>
		</div>
	);
};

export default NoPosts;
