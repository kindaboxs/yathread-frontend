import axios from "axios";

import { axiosInstance } from "@/lib/axios/config";
import type { CreatePostSchema } from "@/modules/post/schemas/create-post-schema";

export interface ErrorResponse {
	success: false;
	message: string;
	stack?: string;
}

export type SuccessResponse<T = void> = {
	success: true;
	message: string;
} & (T extends void ? object : { data: T });

export const postService = {
	create: async (
		values: CreatePostSchema
	): Promise<SuccessResponse<{ postId: string }> | ErrorResponse> => {
		try {
			const response = await axiosInstance.post("/posts", values);

			const data = response.data;
			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const err = error.response?.data as ErrorResponse;
				return {
					success: false,
					message: err.message,
					stack: err.stack,
				};
			}

			return {
				success: false,
				message: "An unexpected error occurred while creating the post.",
			};
		}
	},
};
