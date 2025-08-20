import { createPost } from "@/actions/create-post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { playSound } from "@/lib/PlaySound";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	title: z
		.string()
		.min(1, { message: "Title is required" })
		.max(100, { message: "Title must be at most 100 characters" }),
	description: z.string().min(1, { message: "Description is required" }),
});

type FieldValues = z.infer<typeof schema>;

interface CreatePostFormProps {
	communityId: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostForm = ({ communityId, setOpen }: CreatePostFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
	});
	const queryClient = useQueryClient();

	const { mutateAsync: createPostMutaiton } = useMutation({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: error => {
			console.error("error creating post:", error);
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("communityId", communityId);

		await createPostMutaiton(formData);
		setOpen(false);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
			<label htmlFor="title">Title</label>
			<Input
				type="text"
				{...register("title")}
				id="title"
				placeholder="Title"
			/>
			{errors.title && (
				<div className="text-red-500">{errors.title.message}</div>
			)}
			<label htmlFor="description">Description</label>
			<Textarea
				className="resize-none w-full"
				{...register("description")}
				id="description"
				placeholder="Description"
			/>
			{errors.description && (
				<div className="text-red-500">{errors.description.message}</div>
			)}
			<Button type="submit" onClick={playSound} className="w-[100px]">
				{isSubmitting ? (
					<Loader className="animate-spin" />
				) : (
					"Create Post"
				)}
			</Button>
		</form>
	);
};

export default CreatePostForm;
