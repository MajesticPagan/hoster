"use client";

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./Button";
import { useCallback } from "react";

interface EmptyStateProps {
	title?: string;
	subtitle?: string;
	showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
	title = "Não existem resultados",
	subtitle = "Tente mudar ou remover alguns dos seus filtros",
	showReset,
}) => {
	const router = useRouter();

	const handleButtonClick = useCallback(() => {
		router.push("/");
	}, [router]);

	return (
		<div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
			<Heading title={title} subtitle={subtitle} center />
			{showReset && (
				<div className="w-64 mt-4">
					<Button outline label="Remover todos os filtros" onClick={handleButtonClick} />
				</div>
			)}
		</div>
	);
};

export default EmptyState;
