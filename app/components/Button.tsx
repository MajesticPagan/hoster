"use client";

import { IconType } from "react-icons";

interface ButtonProps {
	label: string;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
	label,
	disabled,
	outline,
	small,
	icon: Icon,
	onClick,
}) => {
	return (
		<button
			type="button"
			className={`relative rounded-lg transition w-full hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed border-gray-900 
			${outline ? "bg-white" : "bg-gray-900"}
			${outline ? "text-gray-800" : "text-white"}
			${small ? "py-1" : "py-3"}
			${small ? "text-sm" : "text-md"}
			${small ? "font-light" : "font-semibold"}
			${small ? "border-[1px]" : "border-2"}`}
			disabled={disabled}
			onClick={onClick}
		>
			{Icon && <Icon size={24} className="absolute top-3 left-4" />}
			{label}
		</button>
	);
};

export default Button;
