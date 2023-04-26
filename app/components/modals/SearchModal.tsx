"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";

import useSearchModal from "@/app/hooks/use-search-modal";

import Modal from "./Modal";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
	LOCATION = 0,
	DATE = 1,
	INFO = 2,
}

const SearchModal = () => {
	const router = useRouter();
	const params = useSearchParams();
	const searchModal = useSearchModal();

	const [step, setStep] = useState(STEPS.LOCATION);
	const [guestCount, setGuestCount] = useState(1);
	const [roomCount, setRoomCount] = useState(1);
	const [bathroomCount, setBathroomCount] = useState(1);
	const [dateRange, setDateRange] = useState<Range>({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});
	const [location, setLocation] = useState<CountrySelectValue>();

	const Map = useMemo(() => {
		return dynamic(() => import("../Map"), {
			ssr: false,
		});
	}, [location]);

	const onBack = useCallback(() => {
		setStep((currentState) => currentState - 1);
	}, []);

	const onNext = useCallback(() => {
		setStep((currentState) => currentState + 1);
	}, []);

	const onSubmit = useCallback(async () => {
		if (step !== STEPS.INFO) {
			return onNext();
		}

		let currentQuery = {};

		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			locationValue: location?.value,
			guestCount,
			roomCount,
			bathroomCount,
		};

		if (dateRange.startDate) {
			updatedQuery.startDate = formatISO(dateRange.startDate);
		}

		if (dateRange.endDate) {
			updatedQuery.endDate = formatISO(dateRange.endDate);
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		setStep(STEPS.LOCATION);
		searchModal.onClose();
		router.push(url);
	}, [
		step,
		location,
		guestCount,
		roomCount,
		bathroomCount,
		dateRange,
		searchModal,
		router,
		onNext,
		params,
	]);

	const actionLabel = useMemo(() => {
		if (step === STEPS.INFO) {
			return "Pesquisar";
		}

		return "Continuar";
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.LOCATION) {
			return undefined;
		}

		return "Anterior";
	}, [step]);

	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading title="Onde deseja ir?" subtitle="Encontre o lugar perfeito" center />
			<CountrySelect
				value={location}
				onChange={(value) => setLocation(value as CountrySelectValue)}
			/>
			<hr />
			<Map center={location?.latlng} />
		</div>
	);

	if (step === STEPS.DATE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Quando deseja ir?"
					subtitle="Certifique-se que toda a gente tem disponibilidade!"
					center
				/>
				<Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
			</div>
		);
	}

	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading title="Mais informações" subtitle="Encontre o lugar perfeito!" center />
				<Counter
					title="Hóspedes"
					subtitle="Quantos hóspedes serão?"
					value={guestCount}
					onChange={(value) => setGuestCount(value)}
				/>
				<hr />
				<Counter
					title="Quartos"
					subtitle="Quantos quartos irá necessitar?"
					value={roomCount}
					onChange={(value) => setRoomCount(value)}
				/>
				<hr />
				<Counter
					title="Casas de Banho"
					subtitle="Quantas casas de banho irão necessitar?"
					value={bathroomCount}
					onChange={(value) => setBathroomCount(value)}
				/>
			</div>
		);
	}

	return (
		<Modal
			title="Filtros"
			actionLabel={actionLabel}
			secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
			secondaryActionLabel={secondaryActionLabel}
			isOpen={searchModal.isOpen}
			onClose={searchModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
		/>
	);
};

export default SearchModal;
