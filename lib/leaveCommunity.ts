export async function leaveCommunity(communityId: string) {
	const res = await fetch(`/api/communities/${communityId}/leave`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to leave community");
	}

	return res.json();
}
