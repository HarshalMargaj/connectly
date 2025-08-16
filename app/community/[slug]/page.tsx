import React from "react";
import { getByComId } from "@/actions/get-communityById";
import Community from "./_components/Community";

export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const { slug } = await params;
	const community = await getByComId(slug);

	return {
		title: `${community?.name} | Community`,
		description: community?.description,
	};
};

const page = () => {
	return <Community />;
};

export default page;
