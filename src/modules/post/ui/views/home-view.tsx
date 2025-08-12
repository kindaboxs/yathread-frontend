"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { ErrorState } from "@/components/global/error-state";
import { LoadingState } from "@/components/global/loading-state";

export const HomeView = () => {
	return <>HomeView</>;
};

export const HomeViewLoading = () => {
	return (
		<LoadingState
			title="Loading Posts"
			description="This might take a while, please wait..."
		/>
	);
};

export const HomeViewError = ({ children }: { children: React.ReactNode }) => {
	return (
		<ReactErrorBoundary
			fallbackRender={({ error, resetErrorBoundary }) => (
				<ErrorState
					title="Oops! Error Loading Posts"
					description="This may be a temporary issue. Please try again later."
					error={error}
					resetErrorBoundaryAction={resetErrorBoundary}
				/>
			)}
		>
			{children}
		</ReactErrorBoundary>
	);
};
