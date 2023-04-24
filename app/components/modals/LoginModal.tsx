"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/use-register-modal";
import useLoginModal from "@/app/hooks/use-login-modal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const LoginModal = () => {
	const router = useRouter();

	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn("credentials", {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success("Sessão iniciada.");
				router.refresh();
				loginModal.onClose();
			} else if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const toggleModal = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Bem vindo de volta" subtitle="Inicie a sessão com a sua conta" center />
			<Input
				id="email"
				label="Email"
				type="email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id="password"
				label="Palavra-passe"
				type="password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Iniciar sessão com o Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label="Iniciar sessão com o Github"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row justify-center items-center gap-2">
					<div>Não possui uma conta?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={toggleModal}
					>
						Registe uma conta
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			title="Iniciar sessão"
			actionLabel="Continuar"
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;
