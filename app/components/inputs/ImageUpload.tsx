"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
	var cloudinary: any;
}

interface ImageUploadProps {
	value: string;
	onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget onUpload={handleUpload} uploadPreset="enqndic5" options={{ maxFiles: 1 }}>
			{({ open }) => {
				return (
					<div
						className="relative cursor-pointer rounded transition border-dashed border-2 p-20  flex flex-col justify-center items-center gap-4 border-neutral-300 hover:border-gray-900 text-neutral-600 hover:text-gray-900"
						onClick={() => open?.()}
					>
						<TbPhotoPlus size={48} />
						<div className="font-semibold text-lg">Clique para carregar</div>
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image
									alt="Carregamento"
									fill
									style={{ objectFit: "cover" }}
									src={value}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
};

export default ImageUpload;
