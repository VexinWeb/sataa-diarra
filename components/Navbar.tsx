// components/Navbar.tsx
import { FC } from "react";
import CakeIcon from "../public/icons/cake";
import GmailIcon from "@/public/icons/gmail";
import InstagramIcon from "@/public/icons/instagram";
import Image from "next/image";

const Navbar: FC = () => {
	return (
		<nav className="flex p-4 h-32 bg-stone-200 items-center">
			<div className="flex items-center justify-center relative w-48 h-full">
				<Image
					className="contrast-150"
					src="/images/logo.png"
					alt="Logo"
					width={200}
					height={100}
				/>
			</div>
			<div className="flex justify-end items-center gap-5 ml-auto">
				<div className="h-5 w-5 text-stone-500 hover:text-stone-800">
					<CakeIcon />
				</div>
				<div className="h-5 w-5 text-stone-500 hover:text-stone-800">
					<GmailIcon />
				</div>
				<div className="h-5 w-5 text-stone-500 hover:text-stone-800">
					<InstagramIcon />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
