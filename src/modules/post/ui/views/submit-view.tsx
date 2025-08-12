"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postService } from "@/lib/axios";
import {
	createPostSchema,
	type CreatePostSchema,
} from "@/modules/post/schemas/create-post-schema";

export const SubmitView = () => {
	const queryClient = useQueryClient();

	const form = useForm<CreatePostSchema>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: "",
			url: "",
			content: "",
		},
		mode: "all",
	});

	const createPost = useMutation({
		mutationFn: (data: CreatePostSchema) => {
			return postService.create(data);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post created successfully", {
				id: "create-post-success",
				description: "Your post has been created and is now visible.",
			});
			form.reset();
		},
		onError: (ctx) => {
			toast.error("Failed to create post", {
				id: "create-post-error",
				description: ctx.message,
			});
		},
	});

	const onSubmitForm = (data: CreatePostSchema) => {
		createPost.mutate(data);
	};

	return (
		<div className="w-full">
			<Card className="mx-auto mt-12 max-w-lg">
				<CardHeader>
					<CardTitle>Create New Post</CardTitle>
					<CardDescription>
						Leave url blank if you want to write a question for discussion. If
						there is no url, the content will appear at the top thread.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmitForm)}
							className="grid gap-6"
						>
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input type="text" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="url"
									render={({ field }) => (
										<FormItem>
											<FormLabel>URL</FormLabel>
											<FormControl>
												<Input type="url" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="content"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Content</FormLabel>
											<FormControl>
												<Textarea {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<Button
								type="submit"
								className="w-full"
								disabled={!form.formState.isValid || createPost.isPending}
							>
								{createPost.isPending ? (
									<>
										<Loader2Icon className="size-4 animate-spin" />
										Creating...
									</>
								) : (
									"Create Post"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};
