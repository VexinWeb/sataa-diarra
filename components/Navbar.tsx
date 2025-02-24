"use client";
// components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { FC } from "react";
import CakeIcon from "@/public/icons/cake";
import GmailIcon from "@/public/icons/gmail";
import InstagramIcon from "@/public/icons/instagram";
import Image from "next/image";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Navbar: FC = () => {
	// State to manage the visibility of the scroll-to-top button
	const [showScrollToTop, setShowScrollToTop] = useState(false);
	// Event handler to go to the top of the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		// Event handler to monitor scrolling
		const handleScroll = () => {
			if (window.scrollY > 100 && window.innerWidth < 800) {
				setShowScrollToTop(true);
			} else {
				setShowScrollToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav className="flex p-4 h-32 bg-stone-200 items-center max-w-[1800px] mx-auto">
			{/* Button to go to top of page */}
			{showScrollToTop && (
				<button
					className="fixed bottom-24 right-4 p-1 text-black bg-white/50 rounded-full z-50"
					onClick={scrollToTop}
					aria-label="Scroll to Top"
				>
					<ArrowUpwardIcon style={{ fontSize: "2rem" }} />
				</button>
			)}
			<a
				className="flex items-center justify-center relative w-48 h-full"
				href="https://www.instagram.com/sataa_diarra?igsh=MXQwMzgwOWFmcjBiaw%3D%3D"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					className="contrast-150"
					src="/logo/logo.png"
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
