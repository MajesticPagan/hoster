"use client";

import { BiSearch } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import useSearchModal from "@/app/hooks/use-search-modal";
import useCountries from "@/app/hooks/use-countries";

const Search = () => {
	const searchModal = useSearchModal();
	const params = useSearchParams();
	const { getByValue } = useCountries();

	const locationValue = params?.get("locationValue");
	const startDate = params?.get("startDate");
	const endDate = params?.get("endDate");
	const guestCount = params?.get("guestCount");

	const locationlabel = useMemo(() => {
		if (locationValue) {
			const location = getByValue(locationValue as string);
			return location?.label;
		}

		return "Qualquer lugar";
	}, [locationValue, getByValue]);

	const dateLabel = useMemo(() => {
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);

			return `${format(start, "d LLL", { locale: pt })} - ${format(end, "PP", {
				locale: pt,
			})}`;
		}

		return "Na semana";
	}, [startDate, endDate]);

	const guestLabel = useMemo(() => {
		if (guestCount) {
			return `${guestCount} ${+guestCount === 1 ? "hóspede" : "hóspedes"}`;
		}

		return "Adicionar hóspedes";
	}, [guestCount]);

	return (
		<div
			className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
			onClick={searchModal.onOpen}
		>
			<div className="flex flex-row items-center justify-between">
				<div className="text-sm font-semibold px-6">{locationlabel}</div>
				<div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
					{dateLabel}
				</div>
				<div className="text-sm pl-6 pr-2 text-grey-600 flex flex-row items-center gap-3">
					<div className="hidden sm:block">{guestLabel}</div>
					<div className="p-2 bg-gray-900 rounded-full text-white">
						<BiSearch size={18} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
