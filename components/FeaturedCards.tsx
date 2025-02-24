// components/FeaturedCards.tsx
import { FC } from "react";
import Image from "next/image";
import data from "../data/items.json";

interface FeaturedItem {
	id: number;
	title: string;
	description: string;
	ingredients: string;
	src: string;
}

const featured: FeaturedItem[] = data.slice(0, 3);

const FeaturedCards: FC = () => {
	return (
		// <section className="px-4 py-12 bg-stone-300">
		<section className="px-4 py-12 bg-sataa/20" id="FeaturedCards">
			<h2 className="text-2xl font-bold mb-2 text-stone-600/90 text-center">
				{/* <h2 className="text-2xl font-bold mb-2 text-stone-100/90 text-center"> */}
				Tout chaud tout frais
			</h2>
			<p className="mb-4 text-lg text-stone-500/90 text-center">
				{/* <p className="mb-4 text-lg text-stone-100/90 text-center"> */}
				Les douceurs du moment
			</p>
			<div className="flex flex-col gap-4 lg:flex-row justify-center items-center">
				{featured.map((item) => (
					<div
						key={item.id}
						className="p-4 border rounded-3xl shadow-sm flex justify-between bg-stone-100/90 w-full sm:w-80 md:w-96"
					>
						<div className="flex flex-col justify-center">
							{/* <h3 className="text-lg font-semibold text-stone-500"> */}
							<h3 className="text-lg font-semibold text-sataa">{item.title}</h3>
							{/* <p className="text-sm text-stone-400">{item.description}</p> */}
							<p className="text-sm text-sataa">{item.description}</p>
							{/* <p className="text-xs text-stone-400">{item.ingredients}</p> */}
							<p className="text-xs text-sataa/80">{item.ingredients}</p>
						</div>
						<div className="relaztive w-24 h-24">
							<Image
								src={item.src}
								alt="Featured item"
								width={150}
								height={150}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturedCards;
