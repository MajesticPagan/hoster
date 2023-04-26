"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";
import { differenceInCalendarDays, eachDayOfInterval, setDate } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

import { SafeListing, SafeUser, SafeReservation } from "@/app/types";
import { categories } from "@/app/constants";

import useLoginModal from "@/app/hooks/use-login-modal";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";

const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: "selection",
};

interface ListingClientProps {
	listing: SafeListing & { user: SafeUser };
	currentUser?: SafeUser | null;
	reservations?: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
	listing,
	currentUser,
	reservations = [],
}) => {
	const loginModal = useLoginModal();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});

			dates = [...dates, ...range];
		});

		return dates;
	}, [reservations]);

	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);

	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			loginModal.onOpen();
		}

		setIsLoading(true);

		axios
			.post("/api/reservations", {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing?.id,
			})
			.then(() => {
				toast.success("Reserva feita com sucesso.");
				setDateRange(initialDateRange);
				router.push("/trips");
			})
			.catch(() => {
				toast.error("Ocorreu um erro, por favor tente novamente mais tarde.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [currentUser, loginModal, totalPrice, dateRange, listing, router]);

	const handleOnChangeDate = (value: Range) => {
		setDateRange(() => value);
	};

	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			} else {
				setTotalPrice(listing.price);
			}
		}
	}, [dateRange, listing.price]);

	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className="flex flex-col gap-6">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							bathroomCount={listing.bathroomCount}
							guestCount={listing.guestCount}
							locationValue={listing.locationValue}
						/>
						<div className="order-first md:order-last mb-10 md:col-span-3">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={handleOnChangeDate}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ListingClient;
