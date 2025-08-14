import { addComment } from "@/actions/add-comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { playSound } from "@/lib/PlaySound";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
	content: z.string("Comment is required"),
});

type FormFields = z.infer<typeof schema>;

interface AddCommentFormProps {
	postId: string;
	userId: string;
}

const AddCommentForm = ({ postId, userId }: AddCommentFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(schema),
	});
	const queryClient = useQueryClient();

	const { mutateAsync: addCommentMutation } = useMutation({
		mutationFn: addComment,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
			console.log("comment added successfully");
		},
		onError: error => {
			console.log(error);
		},
	});

	const onSubmit: SubmitHandler<FormFields> = async data => {
		const formData = new FormData();
		formData.append("content", data.content);
		formData.append("postId", postId);
		formData.append("userId", userId);

		await addCommentMutation(formData);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex items-center gap-4 "
		>
			<Input
				type="text"
				placeholder="Add comment"
				{...register("content")}
			/>
			{errors.content && (
				<div className="text-red-500">{errors.content.message}</div>
			)}
			<Button type="submit" onClick={playSound}>
				{isSubmitting ? "Adding..." : "Add Comment"}
			</Button>
		</form>
	);
};

export default AddCommentForm;
