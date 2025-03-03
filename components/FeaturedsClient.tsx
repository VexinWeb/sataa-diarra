"use client";

import { FC, useState, useEffect } from "react";
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

interface FeaturedsClientProps {
	products: Product[];
}

const FeaturedsClient: FC<FeaturedsClientProps> = ({ products }) => {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);

	return (
		<section
			className="px-4 py-12 bg-sataa/20 min-h-[100vh] lg:min-h-fit flex flex-col justify-center max-w-[1800px] mx-auto"
			id="FeaturedCards"
		>
			<div>
				<div className="pb-8">
					<h2 className="text-2xl font-bold mb-2 text-stone-600/90 text-center">
						Nos créations pâtissières
					</h2>
					<p className="mb-4 text-lg text-stone-500/90 text-center">
						Les douceurs du moment
					</p>
				</div>
				{/* <div className="flex flex-col xl:flex-row justify-center items-center gap-6"> */}
				<div className="flex flex-col xl:flex-row justify-around items-center gap-6">
					{products.map((item) => (
						// <div
						// 	key={item.id}
						// 	className="p-4 border rounded-3xl shadow-sm flex justify-between bg-stone-100/90 w-full sm:w-80 md:w-96 cursor-pointer"
						// 	onClick={() =>
						// 		setSelectedCard(selectedCard === item.id ? null : item.id)
						// 	}
						// >
						<div
							key={item.id}
							className="p-4 border rounded-3xl shadow-sm flex justify-between bg-stone-100/90 w-full sm:w-80 md:w-96 cursor-pointer"
							onClick={() =>
								setSelectedCard(selectedCard === item.id ? null : item.id)
							}
						>
							<div className="flex flex-col justify-center w-full px-2">
								<h3 className="text-lg font-semibold text-sataa pb-1">
									{item.title}
								</h3>

								<p className="text-md md:text-base text-sataa pb-2">
									{item.description}
								</p>
								{selectedCard === item.id && (
									<div className="overflow-hidden transition-max-height duration-2000 ease-in-out">
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
											<span className="lowercase">{item.ingredients}</span>
										</p>
										<p className="text-xs text-sataa/80 animate-fadeIn">
											<strong>Allergènes : </strong>
											<span className="lowercase">{item.allergens}</span>
										</p>
									</div>
								)}
							</div>
							<div className="relative flex items-center w-full">
								<Image
									src={item.image}
									alt="Featured item"
									width={200}
									height={200}
									style={{
										height: "150px",
										width: "150px",
										objectFit: "cover",
									}}
								/>
								{selectedCard === item.id && (
									<div className="text-xs text-stone-600 absolute top-0 right-0 bg-white/90  shadow-sm p-3 h-10 w-10 rounded-full flex items-center justify-center">
										{item.price}€
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturedsClient;
