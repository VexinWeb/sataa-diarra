// import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCards from "@/components/FeaturedCards";
import Delicacies from "@/components/Delicacies";

export default function Home() {
	return (
		<div>
			<main>
				<Navbar />
				<Hero />
				<FeaturedCards />
				<Delicacies />
			</main>
			<footer></footer>
		</div>
	);
}
