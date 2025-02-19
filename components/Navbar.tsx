// components/Navbar.tsx
import { FC } from "react";
import CakeIcon from "../public/icons/cake";
import GmailIcon from "@/public/icons/gmail";
import InstagramIcon from "@/public/icons/instagram";
import Image from "next/image";

const Navbar: FC = () => {
	return (
		<nav className="flex p-4 h-32 bg-stone-200 items-center">
			<a
				className="flex items-center justify-center relative w-48 h-full"
				href="https://www.instagram.com/sataa_diarra?igsh=MXQwMzgwOWFmcjBiaw%3D%3D"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					className="contrast-150"
					src="/images/logo.png"
					alt="Logo"
					width={200}
					height={100}
				/>
			</a>
			<div className="flex justify-end items-center gap-5 ml-auto">
				<a
					className="h-5 w-5 text-stone-500 hover:text-stone-800"
					href="#FeaturedCards"
				>
					<CakeIcon />
				</a>
				<a
					className="h-5 w-5 text-stone-500 hover:text-stone-800"
					href="#ContactForm"
				>
					<GmailIcon />
				</a>
				<a
					className="h-5 w-5 text-stone-500 hover:text-stone-800"
					href="https://www.instagram.com/sataa_diarra?igsh=MXQwMzgwOWFmcjBiaw%3D%3D"
					target="_blank"
					rel="noopener noreferrer"
				>
					<InstagramIcon />
				</a>
			</div>
		</nav>
	);
};

export default Navbar;
