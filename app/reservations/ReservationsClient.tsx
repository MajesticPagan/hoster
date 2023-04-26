"use client";

import { SafeReservation, SafeUser } from "../types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
	reservations: SafeReservation[];
	currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState("");

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);

			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success("Reserva cancelada com sucesso.");
					router.refresh();
				})
				.catch((error) => {
					toast.error("Ocorreu um erro, por favor tente novamente mais tarde.");
				})
				.finally(() => {
					setDeletingId("");
				});
		},
		[router]
	);

	return (
		<Container>
			<Heading title="Reservas" subtitle="Reservas feitas nos seus alojamentos" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						currentUser={currentUser}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel="Cancelar reserva do hóspede"
					/>
				))}
			</div>
		</Container>
	);
};

export default ReservationsClient;
