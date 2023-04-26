"use client";

import { useCallback, useState } from "react";
import { SafeListing, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

interface HomesClientProps {
	listings: SafeListing[];
	currentUser?: SafeUser | null;
}

const HomesClient: React.FC<HomesClientProps> = ({ listings, currentUser }) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/listings/${id}`)
				.then(() => {
					toast.success("Casa removida com sucesso.");
					router.refresh();
				})
				.catch((error) => {
					toast.error(error?.response?.data?.error);
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading
				title="Casas"
				subtitle="Todas as suas casas disponíveis para os hóspedes arrendarem"
			/>
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{listings.map((listing) => (
					<ListingCard
						key={listing.id}
						data={listing}
						currentUser={currentUser}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel="Remover casa"
					/>
				))}
			</div>
		</Container>
	);
};

export default HomesClient;
