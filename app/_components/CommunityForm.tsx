"use client";

import { create } from "@/actions/create-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useUser } from "@clerk/nextjs";

const CommunityForm = () => {
	const { user } = useUser();

	return (
		<form action={create} className="space-y-4">
			<Label htmlFor="name-1">Community Name</Label>
			<Input placeholder="community name" id="name-1" name="name" />
			<Label htmlFor="description-1">Community Description</Label>
			<Input
				placeholder="community description"
				id="description-1"
				name="description"
			/>
			<Input type="hidden" name="userId" value={user?.id} />
			<Button type="submit">Create Community</Button>
		</form>
	);
};

export default CommunityForm;
