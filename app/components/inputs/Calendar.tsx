"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import pt from "date-fns/locale/pt";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
	value: Range;
	disabledDates?: Date[];
	onChange: (value: RangeKeyDict) => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, disabledDates, onChange }) => {
	return (
		<DateRange
			rangeColors={["#111827"]}
			ranges={[value]}
			date={new Date()}
			onChange={onChange}
			direction="vertical"
			showDateDisplay={false}
			minDate={new Date()}
			disabledDates={disabledDates}
			locale={pt}
			showMonthAndYearPickers={false}
		/>
	);
};

export default Calendar;
