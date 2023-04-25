"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { categories } from "@/app/constants";

import useRentModal from "@/app/hooks/use-rent-modal";

import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

const RentModal = () => {
	const router = useRouter();
	const rentModal = useRentModal();
	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: "",
		},
	});

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const category = watch("category");
	const location = watch("location");
	const guestCount = watch("guestCount");
	const roomCount = watch("roomCount");
	const bathroomCount = watch("bathroomCount");
	const imageSrc = watch("imageSrc");

	const Map = useMemo(() => {
		return dynamic(() => import("../Map"), {
			ssr: false,
		});
	}, [location]);

	const onPrev = () => {
		setStep((currentValue) => currentValue - 1);
	};

	const onNext = () => {
		setStep((currentValue) => currentValue + 1);
	};

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.PRICE) {
			return onNext();
		}

		setIsLoading(true);
		axios
			.post("/api/listings/", data)
			.then(() => {
				toast.success("Anúncio criado com sucesso.");
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				rentModal.onClose();
			})
			.catch(() => {
				toast.error("Ocorreu algo de errado, por tente novamente mais tarde.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return "Criar";
		}

		return "Seguinte";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}

		return "Anterior";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Qual destes descreve melhor o seu alojamento?"
				subtitle="Escolha uma categoria"
				center
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							label={item.label}
							icon={item.icon}
							selected={category === item.label}
							onClick={(label) => {
								setCustomValue("category", label);
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);

	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Onde se encontra o seu alojamento?"
					subtitle="Ajude os seus hóspedes a encontrá-lo"
					center
				/>
				<CountrySelect
					value={location}
					onChange={(value) => setCustomValue("location", value)}
				/>
				<Map center={location?.latlng} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Partilhe connosco algumas informações sobre o seu alojamento"
					subtitle="Que acomodações possui?"
					center
				/>
				<Counter
					title="Hóspedes"
					subtitle="Quantos hóspedes irá permitir?"
					value={guestCount}
					onChange={(value) => setCustomValue("guestCount", value)}
				/>
				<hr />
				<Counter
					title="Quartos"
					subtitle="Quantos quartos possui?"
					value={roomCount}
					onChange={(value) => setCustomValue("roomCount", value)}
				/>
				<hr />
				<Counter
					title="Casas de Banho"
					subtitle="Quantas casas de banho possui?"
					value={bathroomCount}
					onChange={(value) => setCustomValue("bathroomCount", value)}
				/>
			</div>
		);
	}

	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Adicione uma foto do seu alojamento"
					subtitle="Mostre aos hóspedes como é o seu espaço!"
					center
				/>
				<ImageUpload
					value={imageSrc}
					onChange={(value) => setCustomValue("imageSrc", value)}
				/>
			</div>
		);
	}

	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Como descreve o seu alojamento?"
					subtitle="Texto breve e descritivo é o recomendado!"
					center
				/>
				<Input
					id="title"
					label="Título"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Descrição"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Agora, insira o preço"
					subtitle="Quanto irá cobrar por noite?"
					center
				/>
				<Input
					id="price"
					label="Preço"
					type="number"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
					formatPrice
				/>
			</div>
		);
	}

	return (
		<Modal
			title="Receba com Hoster"
			actionLabel={actionLabel}
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onPrev}
			body={bodyContent}
		/>
	);
};

export default RentModal;
