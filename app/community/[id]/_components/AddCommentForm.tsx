import { addComment } from "@/actions/add-comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { playSound } from "@/lib/PlaySound";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	content: z.string().min(1, "Comment is required"),
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
			queryClient.invalidateQueries({ queryKey: ["allPosts"] });
			queryClient.invalidateQueries({ queryKey: ["posts"] });
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
			className="flex flex-col gap-4 "
		>
			<div className="flex w-full items-center gap-4">
				<Input
					type="text"
					placeholder="Add comment"
					{...register("content")}
				/>

				<Button type="submit" onClick={playSound}>
					{isSubmitting ? "Adding..." : "Add Comment"}
				</Button>
			</div>
			{errors.content && (
				<div className="text-red-500">{errors.content.message}</div>
			)}
		</form>
	);
};

export default AddCommentForm;
