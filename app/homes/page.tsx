import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import HomesClient from "./HomesClient";

export const metadata = {
	title: "As minhas casas | Hoster",
};

const HomesPage = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title="Acesso não autorizado" subtitle="Por favor inicie a sessão." />
			</ClientOnly>
		);
	}

	const listings = await getListings({ userId: currentUser.id });

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="Nenhuma casa encontrada"
					subtitle="Parece que não tem nenhuma casa."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<HomesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default HomesPage;
