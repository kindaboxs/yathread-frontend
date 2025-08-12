import { ChevronUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostGetManyResponse } from "@/modules/post/types";

interface Props {
	post: PostGetManyResponse;
}

export const PostCard = ({ post }: Props) => {
	return (
		<Card className="flex flex-row items-center justify-center gap-3 px-3 py-3">
			<Button
				variant={post.hasVoted ? "default" : "outline"}
				size="icon"
				className="flex flex-col items-center justify-center gap-0"
			>
				<ChevronUpIcon className="size-4" />
				<span className="text-xs font-medium">{post.points}</span>
			</Button>

			<div className="flex grow flex-col justify-between border">
				<CardHeader className="flex items-start p-3">
					<div className="line-clamp-1 flex grow flex-wrap gap-2">
						<CardTitle className="truncate text-xl font-medium">
							{post.title}
						</CardTitle>
						{post.url && (
							<Badge variant="secondary" className="cursor-pointer text-xs">
								{post.url}
							</Badge>
						)}
					</div>
				</CardHeader>

				<CardContent className="p-0">
					<p>{post.content}</p>
				</CardContent>
			</div>
		</Card>
	);
};
