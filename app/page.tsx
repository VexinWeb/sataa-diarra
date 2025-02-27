import Navbar from "@/components/Navbar";
import HeroClient from "@/components/HeroClient";
import FeaturedsClient from "@/components/FeaturedsClient";
import DelicaciesClient from "@/components/DelicaciesClient";
import Custom from "@/components/Custom";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/server";

export default async function Home() {
	const supabase = await createClient();
	const { data: delicaciesProducts, error: delicaciesError } = await supabase
		.from("products")
		.select("*")
		.in("type", ["all", "hero"]);
	const { data: featuredsProducts, error: featuredsError } = await supabase
		.from("products")
		.select("*")
		.eq("type", "star");
	const { data: heroProduct, error: heroError } = await supabase
		.from("products")
		.select("*")
		.eq("type", "hero");

	if (delicaciesError || featuredsError || heroError) {
		return <div>Erreur lors de la récupération des produits</div>;
	}

	return (
		<main className="">
			<Navbar />
			<HeroClient products={heroProduct} />
			<FeaturedsClient products={featuredsProducts} />
			<DelicaciesClient products={delicaciesProducts} />
			<Custom />
			<ContactForm />
			<Footer />
		</main>
	);
}
