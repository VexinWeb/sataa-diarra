// import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCards from "@/components/FeaturedCards";
import Delicacies from "@/components/Delicacies";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div>
			<main>
				<Navbar />
				<Hero />
				<FeaturedCards />
				<Delicacies />
				<ContactForm />
				<Footer />
			</main>
			<footer></footer>
		</div>
	);
}
