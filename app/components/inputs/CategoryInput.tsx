"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
	label: string;
	icon: IconType;
	selected?: boolean;
	onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({ label, icon: Icon, selected, onClick }) => {
	return (
		<div
			className={`rounded-xl border-2 p-4 flex flex-col items-center text-center gap-3 hover:border-gray-900 transition cursor-pointer
			${selected ? "border-gray-900" : "border-neutral-200"}`}
			onClick={() => onClick(label)}
		>
			<Icon size={30} />
			<div className="font-semibold">{label}</div>
		</div>
	);
};

export default CategoryInput;
