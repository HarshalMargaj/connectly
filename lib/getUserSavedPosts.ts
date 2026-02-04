export async function getUserSavedPosts(userId?: string) {
	const res = await fetch(`/api/users/${userId}/savedPosts`);
	if (!res.ok) {
		throw new Error("Failed to fetch user saved posts");
	}

	return res.json();
}
