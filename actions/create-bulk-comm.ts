// scripts/seed-communities.ts
"use server";

import { db } from "@/lib/db";

async function main() {
	await db.community.createMany({
		data: [
			{
				id: "community_ai",
				name: "AI & Future Tech",
				description:
					"Discussions around artificial intelligence, future technologies, and how AI is reshaping software, startups, and careers.",
				slug: "ai-future-tech",
				userId: "user_30xDc9yjXivDe2abESwZeeGpl5A",
			},
			{
				id: "community_coding",
				name: "Coding & Engineering",
				description:
					"Deep dives into programming, frontend, backend, system design, and real-world engineering practices.",
				slug: "coding-engineering",
				userId: "user_30xDc9yjXivDe2abESwZeeGpl5A",
			},
			{
				id: "community_jobs",
				name: "Tech Careers & Job Market",
				description:
					"Career guidance, job market trends, interview preparation, and growth advice for developers.",
				slug: "tech-careers",
				userId: "user_30xDc9yjXivDe2abESwZeeGpl5A",
			},
		],
	});
}

main()
	.then(() => {
		console.log("✅ Communities seeded");
		process.exit(0);
	})
	.catch(console.error);
