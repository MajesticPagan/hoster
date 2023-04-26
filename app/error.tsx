"use client";

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
	error: Error;
}

const Error: React.FC<ErrorStateProps> = ({ error = null }) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<EmptyState
			title="Oh não!"
			subtitle="Ocorreu algo de errado, por favor tente aceder a esta página mais tarde."
		/>
	);
};

export default Error;
