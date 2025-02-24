import Navbar from "@/components/Navbar";
import HeroClient from "@/components/HeroClient";
import FeaturedsClient from "@/components/FeaturedsClient";
import DelicaciesClient from "@/components/DelicaciesClient";
import Custom from "@/components/Custom";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/server";
import Delicacies from "@/components/DelicaciesClient";

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
			{/* <h1>Produits</h1>
			{products?.map((p) => (
				<div key={p.id}>
					<h2>{p.title}</h2>
					<p>{p.description}</p>
					<div className="relaztive w-24 h-24 flex mb-4">
						<Image src={p.image} alt="Featured item" width={150} height={150} />
					</div>
				</div>
			))} */}
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
