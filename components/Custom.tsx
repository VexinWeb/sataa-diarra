"use client";

import { FC, useState } from "react";
import Image from "next/image";
// import { type ClassValue } from "clsx";

// interface Product {
//     id: number;
//     title: string;
//     description: string;
//     ingredients: string;
//     image: string;
//     type: string;
// }

// interface DelicaciesClientProps {
//     products: Product[];
// }

const Custom: FC = () => {
	const [showAll, setShowAll] = useState<boolean>(false);

	return (
		<section className="px-4 py-12 mb-12 max-w-[1800px] mx-auto">
			<div
				className="bg-stone-100/100 text-center cursor-pointer p-6 border rounded-3xl shadow-sm"
				onClick={() => setShowAll((prev) => !prev)}
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
						<p className="text text-stone-500/90 text-left">
							Quel que soit le type d'événement que vous vous apprêtez à
							réaliser, je prendrai le temps de penser votre création pâtissière
							sur mesure en fonction de vos envies.
							<br />
							<br />
							Prenez contact ci-dessous :-)
							<br />
							<br />
							Sataa
						</p>
					</>
				)}
			</div>
		</section>
	);
};

export default Custom;
