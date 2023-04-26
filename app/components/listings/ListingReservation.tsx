"use client";

import { Range } from "react-date-range";

import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
	price: number;
	totalPrice: number;
	dateRange: Range;
	disabled?: boolean;
	disabledDates: Date[];
	onChangeDate: (value: Range) => void;
	onSubmit: () => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
	price,
	totalPrice,
	dateRange,
	disabled,
	disabledDates,
	onChangeDate,
	onSubmit,
}) => {
	const handleOnChange = (value: any) => {
		onChangeDate(value.selection);
	};

	return (
		<div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
			<div className="flex flex-row items-center gap-2 p-4">
				<div className="text-2xl font-semibold">€ {price}</div>
				<div className="font-light text-neutral-600">/ noite</div>
			</div>
			<hr />
			<Calendar value={dateRange} disabledDates={disabledDates} onChange={handleOnChange} />
			<hr />
			<div className="p-4">
				<Button label="Reservar" disabled={disabled} onClick={onSubmit} />
			</div>
			<div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
				<div>Total</div>
				<div>€ {totalPrice}</div>
			</div>
		</div>
	);
};

export default ListingReservation;
