"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
	const router = useRouter();

	return (
		<div className="hidden md:block cursor-pointer" onClick={() => router.push("/")}>
			<span className="font-bold text-2xl">Hoster</span>
		</div>
	);
};

export default Logo;
