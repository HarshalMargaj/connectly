"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { playSound } from "@/lib/PlaySound";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Loader } from "lucide-react";

const schema = z.object({
	content: z.string().min(1, "Comment is required"),
});

type FormFields = z.infer<typeof schema>;

type CommentPayload = {
	content: string;
	postId: string;
};

interface AddCommentFormProps {
	postId: string;
}

const AddCommentForm = ({ postId }: AddCommentFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
	});
	const queryClient = useQueryClient();

	const addComment = async (payload: CommentPayload) => {
		const res = await fetch("/api/posts/comments/create", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				content: payload.content,
				postId: payload.postId,
			}),
		});

		if (!res.ok) {
			toast.error("Failed to add comment");
		}

		return res.json();
	};

	const { mutateAsync: addCommentMutation } = useMutation({
		mutationFn: addComment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: error => {
			console.error(error);
		},
	});

	const onSubmit: SubmitHandler<FormFields> = async data => {
		await addCommentMutation({ content: data.content, postId: postId });
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 "
		>
			<div className="flex w-full items-center gap-4">
				<Input
					type="text"
					placeholder="Add comment"
					{...register("content")}
				/>

				<Button
					type="submit"
					onClick={playSound}
					className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] text-white rounded-lg font-medium hover:from-[#7C3AED] hover:to-[#5B21B6] w-[150px]"
				>
					{isSubmitting ? (
						<Loader className="animate-spin" />
					) : (
						"Add Comment"
					)}
				</Button>
			</div>
			{errors.content && (
				<div className="text-red-500">{errors.content.message}</div>
			)}
		</form>
	);
};

export default AddCommentForm;
