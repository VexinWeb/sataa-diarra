"use client";

import { FC, useState } from "react";
import Image from "next/image";

interface Product {
	id: number;
	title: string;
	type: string;
	image: string;
	description: string;
	flavors: string;
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
		<section className="py-8 px-4 max-w-[1800px] mx-auto">
			<div
				className="bg-stone-100/100 text-center cursor-pointer p-6 border rounded-3xl shadow-sm"
				onClick={() => setShowCards((prev) => !prev)}
				tabIndex={0}
				role="button"
				aria-expanded={showCards}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setShowCards((prev) => !prev);
					}
				}}
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
						<article
							key={item.id}
							className={`p-4 border rounded-3xl shadow-sm flex flex-col cursor-pointer animate-fadeIn transition-colors duration-300 ${
								selectedCard === item.id ? "bg-white/95" : "bg-stone-100/100"
							}`}
							onClick={() =>
								setSelectedCard(selectedCard === item.id ? null : item.id)
							}
							tabIndex={0}
							role="button"
							aria-expanded={selectedCard === item.id ? "true" : "false"}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									setSelectedCard(selectedCard === item.id ? null : item.id);
								}
							}}
						>
							<div className="relative flex justify-center mb-4">
								<Image
									src={item.image}
									alt="Featured item"
									width={150}
									height={150}
									className="h-[150px] w-[150px] object-cover"
									// onLoad={() => console.log("Image loaded:", item.image)}
								/>

								{selectedCard === item.id && (
									<div className="text-xs text-stone-600 absolute top-0 right-0 bg-white/90 shadow-xl p-3 h-10 w-10 rounded-full flex items-center justify-center">
										{item.price}€
									</div>
								)}
								{/* ou bien */}
								{/* Affichage permanent du prix */}
								{/* <div className="text-xs text-stone-600 absolute top-0 right-0 bg-white/90  shadow-sm p-3 h-10 w-10 rounded-full flex items-center justify-center">
									{item.price}€
								</div> */}
							</div>
							<div className="flex flex-col justify-center">
								<h3 className="text-lg font-semibold text-sataa pb-1">
									{item.title}
								</h3>
								<p className="text-sm md:text-md text-sataa pb-2">
									{item.description}
								</p>
								{selectedCard === item.id && (
									<div className="animate-fadeIn overflow-hidden">
										{item.flavors && (
											<p className="text-xs text-sataa/80 pb-2 animate-fadeIn ">
												<strong>
													{item.flavors?.includes(",") ||
													item.flavors?.includes(";") ||
													item.flavors?.includes("/") ||
													item.flavors?.includes("-")
														? "Parfums : "
														: "Parfum : "}
												</strong>
												<span className="lowercase">{item.flavors}</span>
											</p>
										)}
										<p className="text-xs text-sataa/80 pb-2 animate-fadeIn">
											<strong>Ingrédients : </strong>
											{item.ingredients}
										</p>
										{item.allergens && (
											<p className="text-xs text-sataa/80 animate-fadeIn">
												<strong>Allergènes : </strong>
												{item.allergens}
											</p>
										)}
									</div>
								)}
							</div>
						</article>
					))}
				</div>
			)}
		</section>
	);
};

export default DelicaciesClient;
