"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

import useRegisterModal from "@/app/hooks/use-register-modal";
import useLoginModal from "@/app/hooks/use-login-modal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios
			.post("/api/register", data)
			.then(() => {
				registerModal.onClose();
				loginModal.onOpen();
			})
			.catch((error) => {
				toast.error("Ocorreu um erro, por favor tente novamente mais tarde.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const toggleModal = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [registerModal, loginModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Bem vindo ao Hoster" subtitle="Crie uma conta" center />
			<Input
				id="Name"
				label="Nome"
				type="text"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
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
				label="Registrar com o Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label="Registrar com o Github"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<div className="flex flex-row justify-center items-center gap-2">
					<div>Já tem uma conta?</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={toggleModal}
					>
						Inicie a sessão
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			title="Registar uma conta"
			actionLabel="Continuar"
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
