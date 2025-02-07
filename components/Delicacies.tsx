// components/Delicacies.tsx
"use client";

import { FC, useState } from "react";
import Image from "next/image";
import data from "../data/items.json";

interface Delicacy {
	id: number;
	title: string;
	description: string;
	ingredients: string;
	src: string;
}

const delicacies: Delicacy[] = data.slice(3);

const Delicacies: FC = () => {
	const [showAll, setShowAll] = useState<boolean>(false);

	// // Exemple de données : ici 12 cartes
	// const delicacies: Delicacy[] = Array.from({ length: 12 }, (_, i) => ({
	// 	id: i + 1,
	// 	title: `Délice ${i + 1}`,
	// }));

	return (
		<section className="px-4 py-12">
			<div
				className="bg-stone-100/100 text-center cursor-pointer p-12 border rounded-3xl shadow-sm"
				onClick={() => setShowAll((prev) => !prev)}
			>
				<h2 className="text-lg text-stone-600/90 font-bold">
					Voir toutes les pâtisseries
				</h2>
				<p className="text text-stone-500/90 text-center">
					Les douceurs 4 saisons
				</p>
			</div>

			{showAll && (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 py-6">
					{delicacies.map((item) => (
						<div
							key={item.id}
							className="p-4 border rounded-3xl shadow-sm flex flex-col items-center justify-center bg-stone-100/100"
						>
							<div className="relaztive w-24 h-24 flex mb-4">
								<Image
									src={item.src}
									alt="Featured item"
									width={150}
									height={150}
								/>
							</div>
							<div className="flex flex-col justify-center">
								<h3 className="text font-semibold text-sataa">{item.title}</h3>
								<p className="text-sm text-sataa">{item.description}</p>
								<p className="text-xs text-sataa/80">{item.ingredients}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default Delicacies;
