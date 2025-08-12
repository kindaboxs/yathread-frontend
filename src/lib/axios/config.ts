import axios from "axios";

import { env } from "@/env";

export const axiosInstance = axios.create({
	baseURL: `${env.NEXT_PUBLIC_BACKEND_URL}/api`,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});
