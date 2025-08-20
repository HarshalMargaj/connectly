import React from "react";
import { getByComId } from "@/actions/get-communityBySlug";
import Community from "./_components/Community";

type PageProps = {
	params: {
		slug: string;
	};
};

export const generateMetadata = async ({ params }: PageProps) => {
	const community = await getByComId(params.slug);

	return {
		title: `${community?.name} | Community`,
		description: community?.description,
	};
};

const Page = ({}: PageProps) => {
	return <Community />;
};

export default Page;
