import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/server";

export default async function ProductsPage() {
	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/sign-in");
	}

	const { data: products, error } = await supabase.from("products").select("*");

	console.log("User ID:", user.id);
	console.log("Requête complète:", products);

	return (
		<main style={{ padding: "1rem" }}>
			<h1>Liste des produits bruts en lecture publique (non authentifié)</h1>
			{products && products.length > 0 ? (
				<ul>
					{products.map((product) => (
						<li key={product.id}>Données brutes: {JSON.stringify(product)}</li>
					))}
				</ul>
			) : (
				<p>Aucun produit trouvé.</p>
			)}
		</main>
	);
}
