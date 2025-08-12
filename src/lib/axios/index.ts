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
	create: async (values: CreatePostSchema) => {
		try {
			const response = await axiosInstance.post("/posts", values);

			if (response.status !== 201) {
				const data = response.data as ErrorResponse;
				return data;
			}

			const data = response.data as SuccessResponse<{ postId: string }>;
			return data;
		} catch (error) {
			return {
				success: false,
				message: String(error),
			} as ErrorResponse;
		}
	},
};
