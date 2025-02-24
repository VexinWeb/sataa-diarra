"use client";

import { FC, useState } from "react";
import Image from "next/image";
// import { type ClassValue } from "clsx";

interface Product {
	id: number;
	title: string;
	type: string;
	image: string;
	description: string;
	ingredients: string;
	allergens: string;
	price: string;
}

interface DelicaciesClientProps {
	products: Product[];
}

const DelicaciesClient: FC<DelicaciesClientProps> = ({ products }) => {
	const [showCards, setShowCards] = useState<boolean>(false);
	const [selectedCard, setSelectedCard] = useState<number | null>(null);

	return (
		<section className="px-4 py-12 mt-12 max-w-[1800px] mx-auto">
			<div
				className="bg-stone-100/100 text-center cursor-pointer p-6 border rounded-3xl shadow-sm"
				onClick={() => setShowCards((prev) => !prev)}
			>
				<h2 className="text-2xl text-stone-600/90 font-bold">
					{showCards ? "Moins de pâtisseries" : "Plus de pâtisseries"}
				</h2>
				<p className="text text-stone-500/90 text-center">
					Les douceurs 4 saisons
				</p>
			</div>

			{showCards && (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 py-6">
					{products.map((item) => (
						<div
							key={item.id}
							className="p-4 border rounded-3xl shadow-sm flex flex-col bg-stone-100/100 cursor-pointer"
							onClick={() =>
								setSelectedCard(selectedCard === item.id ? null : item.id)
							}
						>
							<div className="relative flex justify-center mb-4">
								{/* <div className="relative flex mb-4"> */}
								<Image
									src={item.image}
									alt="Featured item"
									width={150}
									height={150}
								/>
								{/* Affichage conditionnel du prix */}
								{selectedCard === item.id && (
									<div className="text-xs text-stone-600 absolute top-0 right-0 bg-white/90  shadow-sm p-3 h-10 w-10 rounded-full flex items-center justify-center">
										{item.price}€
									</div>
								)}
								{/* Affichage permanent du prix */}
								{/* <div className="text-xs text-stone-600 absolute top-0 right-0 bg-white/90  shadow-sm p-3 h-10 w-10 rounded-full flex items-center justify-center">
									{item.price}€
								</div> */}
							</div>
							<div className="flex flex-col justify-center">
								<h3 className="text font-semibold text-sataa pb-1">
									{item.title}
								</h3>
								<p className="text-sm text-sataa pb-2">{item.description}</p>
								{selectedCard === item.id && (
									<div className="animate-fadeIn overflow-hidden">
										<p className="text-xs text-sataa/80 pb-1">
											Ingrédients : {item.ingredients}
										</p>
										<p className="text-xs text-sataa/80">
											Allergènes : {item.allergens}
										</p>
									</div>
								)}
								{/* <p className="text-xs text-sataa/80">{item.ingredients}</p> */}
							</div>
						</div>
					))}
				</div>
			)}
		</section>
	);
};

export default DelicaciesClient;
