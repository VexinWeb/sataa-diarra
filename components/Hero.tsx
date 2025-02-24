// components/Hero.tsx
import { FC } from "react";
import Image from "next/image";

const Hero: FC = () => {
	return (
		<section className="flex flex-col justify-center relative max-w-5xl mx-auto py-12 h-[calc(100vh-128px)]">
			<div className="mx-auto">
				<Image
					src="/images/hero.png"
					alt="Pâtisserie"
					width={500}
					height={500}
				/>
			</div>
			<div className="relative inset-0 flex flex-col justify-center items-center bg-stone-300/10">
				<h1 className="text-2xl md:text-4xl text-stone-600 font-bold">
					La pâtisserie de Sataa Diarra
				</h1>
				<p className="text-sm md:text-lg text-stone-600 mt-2 px-4 text-center">
					Des douceurs artisanales préparées avec passion
				</p>
			</div>
		</section>
	);
};

export default Hero;
