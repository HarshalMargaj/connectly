export async function getUserJoinedCommunities(userId?: string) {
	if (!userId) return [];

	const res = await fetch(`/api/users/${userId}/joinedCommunities`);

	if (!res.ok) {
		throw new Error("Failed to fetch user joined communities");
	}

	return res.json();
}
