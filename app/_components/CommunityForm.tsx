import { create } from "@/actions/create-community";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const CommunityForm = () => {
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
			<Button type="submit">Create Community</Button>
		</form>
	);
};

export default CommunityForm;
