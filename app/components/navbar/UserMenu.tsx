"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/use-register-modal";
import useLoginModal from "@/app/hooks/use-login-modal";
import useRentModal from "@/app/hooks/use-rent-modal";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();

	const [isOpen, setIsOpen] = useState(false);

	const handleToggleOpen = useCallback(() => {
		setIsOpen((currentState) => !currentState);
	}, []);

	const handleOnRent = useCallback(() => {
		if (!currentUser) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	}, [currentUser, loginModal, rentModal]);

	return (
		<div className="relative">
			<div className="flex flex-row items-center gap-3">
				<div
					className="hidden md:block text-sm font-semibol py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
					onClick={handleOnRent}
				>
					Receba com Hoster
				</div>
				<div
					className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
					onClick={handleToggleOpen}
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={currentUser?.image} />
					</div>
				</div>
			</div>

			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{currentUser ? (
							<>
								<MenuItem
									onClick={() => router.push("/trips")}
									label="As minhas viagens"
								/>
								<MenuItem
									onClick={() => router.push("/favorites")}
									label="Os meus favoritos"
								/>
								<MenuItem
									onClick={() => router.push("/reservations")}
									label="As minhas reservas"
								/>
								<MenuItem
									onClick={() => router.push("/homes")}
									label="As minhas casas"
								/>
								<MenuItem onClick={rentModal.onOpen} label="Receber com Hoster" />
								<hr />
								<MenuItem onClick={() => signOut()} label="Terminar sessão" />
							</>
						) : (
							<>
								<MenuItem onClick={loginModal.onOpen} label="Iniciar sessão" />
								<MenuItem onClick={registerModal.onOpen} label="Registar" />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
