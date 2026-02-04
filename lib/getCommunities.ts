export async function getCommunities() {
	const res = await fetch("api/communities");

	if (!res.ok) {
		throw new Error("Failed to fetch communities");
	}

	return res.json();
}
