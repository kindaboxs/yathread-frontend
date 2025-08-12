"use client";

import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { makeQueryClient } from "@/lib/query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
	if (typeof window === "undefined") {
		// Server: always make a new query client
		return makeQueryClient();
	}
	// Browser: use singleton pattern to keep the same query client
	clientQueryClientSingleton ??= makeQueryClient();

	return clientQueryClientSingleton;
};

export function AppQueryClientProvider(
	props: Readonly<{
		children: React.ReactNode;
	}>
) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
