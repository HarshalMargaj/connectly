import React from "react";
import { getByComId } from "@/actions/get-communityById";
import Community from "./_components/Community";

export const generateMetadata = async ({
	params,
}: {
	params: { id: string };
}) => {
	const community = await getByComId(params.id);

	return {
		title: `${community?.name} | Community`,
		description: community?.description,
	};
};

const page = () => {
	return <Community />;
};

export default page;
