import React from "react";
import { getByComId } from "@/actions/get-communityBySlug";
import Community from "./_components/Community";

type PageProps = {
	params: {
		slug: string;
	};
};

export const generateMetadata = async ({ params }: PageProps) => {
	const param = await params;
	console.log(param);
	const community = await getByComId(param.slug);

	return {
		title: `${community?.name} | Community`,
		description: community?.description,
	};
};

const Page = () => {
	return <Community />;
};

export default Page;
