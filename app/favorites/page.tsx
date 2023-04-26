import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
	const currentUser = await getCurrentUser();
	const listings = await getFavoriteListings();

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title="Nenhum favorito encontrado"
					subtitle="Parece que não tem nenhum favorito adicionado."
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default FavoritesPage;
