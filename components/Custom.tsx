"use client";

import { FC, useState } from "react";
import Image from "next/image";

const Custom: FC = () => {
	const [showAll, setShowAll] = useState<boolean>(false);

	return (
		// <section className="px-4 py-12 mb-12 max-w-[1800px] mx-auto">
		// <section className="py-6 mb-12 max-w-lg mx-auto">
		<section className="py-4 mb-6 px-4 max-w-[1800px] mx-auto">
			<div
				className="bg-stone-100/100 text-center cursor-pointer p-6 border rounded-3xl shadow-sm"
				onClick={() => setShowAll((prev) => !prev)}
				tabIndex={0}
				role="button"
				aria-expanded={showAll}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setShowAll((prev) => !prev);
					}
				}}
			>
				<h2 className="text-2xl text-stone-600/90 font-bold">
					{showAll ? "Pour une envie particulière" : "Une envie particulière ?"}
				</h2>
				{!showAll && (
					<p className="text text-stone-500/90 text-center">
						Je m'en occuppe !
					</p>
				)}
				{showAll && (
					<>
						<br />
						{/* <p className="text text-stone-500/90 text-left animate-fadeIn grid gap-4 grid-cols-1 md:grid-cols-2"> */}
						{/* <p className="text text-stone-500/90 text-left animate-fadeIn">
							Quel que soit le type d'événement que vous vous apprêtez à
							réaliser, je prendrai le temps de penser votre création pâtissière
							sur mesure en fonction de vos envies.
							<br />
							<br />
							Prenez contact ci-dessous :-)
							<br />
							<br />
							Sataa
						</p> */}
						<p className="text text-stone-500/90 text-left animate-fadeIn grid grid-cols-1 md:grid-cols-4 gap-4">
							<span className="md:col-span-2 md:col-start-2">
								Quel que soit le type d'événement que vous vous apprêtez à
								réaliser, je prendrai le temps de penser votre création
								pâtissière sur mesure en fonction de vos envies.
								<br />
								<br />
								Prenez contact ci-dessous :-)
								<br />
								<br />
								Sataa
							</span>
						</p>
					</>
				)}
			</div>
		</section>
	);
};

export default Custom;
