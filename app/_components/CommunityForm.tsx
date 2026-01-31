"use client";

import React from "react";

import { create } from "@/actions/create-community";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUser } from "@clerk/nextjs";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playSound } from "@/lib/PlaySound";
import { Loader } from "lucide-react";

const schema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be at least 3 characters long" })
		.max(15, { message: "Name must not exceed 15 characters" }),
	description: z
		.string()
		.min(1, { message: "Description must be at least 10 characters long" })
		.max(200, { message: "Description must not exceed 200 characters" }),
});

type FieldValues = z.infer<typeof schema>;

interface CommunityFormProps {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommunityForm = ({ setIsOpen }: CommunityFormProps) => {
	const { user } = useUser();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
	});

	const { mutateAsync: createCommunityMutation } = useMutation({
		mutationFn: create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["communities"] });
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("userId", user?.id || "");

		await createCommunityMutation(formData);
		setIsOpen(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Label htmlFor="name-1">Community Name</Label>
			<div>
				<Input
					placeholder="community name"
					id="name-1"
					{...register("name")}
				/>
				{errors.name && (
					<div className="text-red-500 text-sm">
						{errors.name.message}
					</div>
				)}
			</div>
			<Label htmlFor="description-1">Community Description</Label>
			<div>
				<Input
					placeholder="community description"
					id="description-1"
					{...register("description")}
				/>
				<Input type="hidden" name="userId" value={user?.id} />
				{errors.description && (
					<div className="text-red-500 text-sm">
						{errors.description.message}
					</div>
				)}
			</div>
			<Button
				type="submit"
				onClick={playSound}
				className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-lg font-medium hover:from-[#7C3AED] hover:to-[#5B21B6] w-[150px]"
			>
				{isSubmitting ? (
					<Loader className="animate-spin" />
				) : (
					"Create Community"
				)}
			</Button>
		</form>
	);
};

export default CommunityForm;
