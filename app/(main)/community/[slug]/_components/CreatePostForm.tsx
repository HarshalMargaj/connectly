import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { playSound } from "@/lib/PlaySound";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
	title: z
		.string()
		.min(1, { message: "Title is required" })
		.max(100, { message: "Title must be at most 100 characters" }),
	description: z.string().min(1, { message: "Description is required" }),
});

type FieldValues = z.infer<typeof schema>;

type PostPyload = {
	title: string;
	description: string;
	postId?: string;
	communityId: string;
};

interface CreatePostFormProps {
	post?: Post;
	communityId: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	mode: string;
}

const CreatePostForm = ({ post, communityId, mode }: CreatePostFormProps) => {
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

	const createPost = async (payload: PostPyload) => {
		const res = await fetch("/api/posts/create", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			toast.error("Failed to create post");
		}

		return res.json();
	};

	const updatePost = async (payload: PostPyload) => {
		const res = await fetch("/api/posts/update", {
			method: "PULL",
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			toast.error("Failed to update post");
		}

		return res.json();
	};

	const { mutateAsync: PostMutaiton } = useMutation({
		mutationFn: mode === "create" ? createPost : updatePost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts", communityId] });
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({ queryKey: ["userPosts"] });
			queryClient.invalidateQueries({ queryKey: ["community"] });
		},
		onError: error => {
			console.error("error creating post:", error);
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async data => {
		await PostMutaiton({
			title: data.title,
			description: data.title,
			communityId: communityId,
			postId: mode === "create" ? undefined : post?.id,
		});
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
			<Button
				type="submit"
				onClick={playSound}
				className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-lg font-medium hover:from-[#7C3AED] hover:to-[#5B21B6] w-[100px]"
			>
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
