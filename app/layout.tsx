import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./components/providers/ToasterProvider";

import getCurrentUser from "./actions/getCurrentUser";

import { Nunito } from "next/font/google";
import "./globals.css";

export const metadata = {
	title: "Hoster",
	description: "Airbnb type app.",
};

const font = Nunito({
	subsets: ["latin"],
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	const currentUser = await getCurrentUser();

	return (
		<html lang="pt-pt">
			<body className={font.className}>
				<ClientOnly>
					<Navbar currentUser={currentUser} />
					<RegisterModal />
					<LoginModal />
					<ToasterProvider />
				</ClientOnly>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
