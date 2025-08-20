import { createPost } from "@/actions/create-post";
import { updatePost } from "@/actions/update-post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { playSound } from "@/lib/PlaySound";
import { zodResolver } from "@hookform/resolvers/zod";
import { Community, Post } from "@prisma/client";
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
	post?: Post;
	communityId: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mode: string;
}

const CreatePostForm = ({
	post,
	communityId,
	setOpen,
	mode,
}: CreatePostFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			title: post ? post.title : "",
			description: post ? post.description : "",
		},
	});

	const queryClient = useQueryClient();

	const { mutateAsync: PostMutaiton } = useMutation({
		mutationFn: mode === "create" ? createPost : updatePost,
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
		formData.append("postId", post?.id as string);

		await PostMutaiton(formData);
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
				) : mode === "create" ? (
					"Create Post"
				) : (
					"Edit Post"
				)}
			</Button>
		</form>
	);
};

export default CreatePostForm;
