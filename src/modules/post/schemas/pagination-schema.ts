import { z } from "zod";

const sortBySchema = z.enum(["top", "newest", "hot"]);
const orderBySchema = z.enum(["asc", "desc"]);

export type SortBy = z.infer<typeof sortBySchema>;
export type OrderBy = z.infer<typeof orderBySchema>;

export const postPaginationSchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).default(10),
	cursor: z.coerce.number().optional(),
	sortBy: sortBySchema.default("top"),
	orderBy: orderBySchema.default("desc"),
	author: z
		.string()
		.trim()
		.transform((author) => (author.length ? author : undefined))
		.optional(),
	site: z
		.string()
		.trim()
		.transform((site) => (site.length ? site : undefined))
		.optional(),
});
