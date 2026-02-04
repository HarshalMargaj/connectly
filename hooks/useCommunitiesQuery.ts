import { getCommunities } from "@/lib/getCommunities";
import { useQuery } from "@tanstack/react-query";

export const useCommunitiesQuery = () => {
	return useQuery({
		queryFn: getCommunities,
		queryKey: ["allCommunities"],
		staleTime: 5 * 60 * 1000,
	});
};
