"use client";

import { Listing, Reservation } from "@prisma/client";
import { SafeUser, SafeListing } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import useCountries from "@/app/hooks/use-countries";

import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
	data: SafeListing;
	reservation?: Reservation;
	currentUser?: SafeUser | null;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	onAction?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	currentUser,
	disabled,
	actionLabel,
	actionId = "",
	onAction,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} = ${format(end, "PP")}`;
	}, [reservation]);

	const handleCancel = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();

			if (disabled) {
				return;
			}

			onAction?.(actionId);
		},
		[disabled, onAction, actionId]
	);

	const handleCardClick = () => {
		router.push(`/listings/${data.id}`);
	};

	return (
		<div className="col-span-1 cursor-pointer group" onClick={handleCardClick}>
			<div className="flex flex-col w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						className="object-cover w-full h-full group-hover:scale-110 transition"
						alt="Alojamento"
						src={data.imageSrc}
						fill
					/>
					<div className="absolute top-3 right-3">
						<HeartButton listingId={data.id} currentUser={currentUser} />
					</div>
				</div>
				<div className="font-semibod text-lg mt-3">
					{location?.label}, {location?.region}
				</div>
				<div className="font-light text-neutral-500">
					{reservationDate || data.category}
				</div>
				<div className="flex flex-row items-center gap-1 mt-2">
					<div className="font-semibold">€ {price}</div>
					{!reservation && <div className="font-light">/ noite</div>}
				</div>
				{onAction && actionLabel && (
					<Button small disabled={disabled} label={actionLabel} onClick={handleCancel} />
				)}
			</div>
		</div>
	);
};

export default ListingCard;
