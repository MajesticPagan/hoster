import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Acesso não autorizado" subtitle="Por favor inicie a sessão." />
			</ClientOnly>
		);
	}

	const reservations = await getReservations({ authorId: currentUser.id });

	if (reservations.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="Nenhuma reserva encontrada"
					subtitle="Parece que ainda não houve nenhuma reserva nos seus alojamentos."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ReservationsClient reservations={reservations} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default ReservationsPage;
