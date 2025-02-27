"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
	id: number;
	title: string;
	type: string;
	price: number;
	description: string;
	flavors: string;
	ingredients: string;
	allergens: string;
	image: string;
	created_at: string;
}

const ProductManager = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [newProduct, setNewProduct] = useState({
		id: 0,
		title: "",
		type: "",
		price: "",
		description: "",
		flavors: "",
		ingredients: "",
		allergens: "",
		image: "",
	});
	const [productTypes, setProductTypes] = useState<string[]>([]);

	const supabase = createClient();

	const fetchProducts = async () => {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("created_at", { ascending: false });

		if (data) setProducts(data);
	};

	const addProduct = async () => {
		const { id, ...productWithoutId } = newProduct; // On exclut l'id
		const { data, error } = await supabase
			.from("products")
			.insert([productWithoutId])
			.select();

		if (error) {
			console.error("Erreur lors de l'ajout:", error);
			return;
		}

		fetchProducts();
		setShowAddForm(false);
	};

	const deleteProduct = async (id: number) => {
		const isConfirmed = window.confirm(
			"Êtes-vous sûr de vouloir supprimer ce produit ?"
		);

		if (!isConfirmed) return;

		try {
			const { error } = await supabase.from("products").delete().eq("id", id);

			if (error) throw error;

			fetchProducts();
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
		}
	};

	const updateProduct = async (productId: number) => {
		const supabase = createClient();
		const { error } = await supabase
			.from("products")
			.update({
				title: newProduct.title,
				description: newProduct.description,
				type: newProduct.type,
				flavors: newProduct.flavors,
				ingredients: newProduct.ingredients,
				allergens: newProduct.allergens,
				price: newProduct.price.toString(),
				// price: newProduct.price,
				image: newProduct.image,
			})
			.eq("id", productId);

		if (!error) {
			// Rafraîchir la liste des produits
			fetchProducts();
			setSelectedProduct(null);
		}

		fetchProducts();
		setShowAddForm(false); // Ferme le formulaire
	};

	type ProductTypes = "" | "hero" | "star" | "all";

	const typeLabels: Record<ProductTypes, string> = {
		hero: "La pâtisserie en haut de page",
		star: "Les pâtisseries du moment",
		all: "Toutes les autres pâtisseries",
		"": "Pâtisseries non affichées",
	};

	const groupedProducts: Record<ProductTypes, Product[]> = {
		"": products.filter((p) => p.type === ""),
		hero: products.filter((p) => p.type === "hero"),
		star: products.filter((p) => p.type === "star"),
		all: products.filter((p) => p.type === "all"),
	};

	useEffect(() => {
		const fetchTypes = async () => {
			const { data } = await supabase.from("products").select("type");

			if (data) {
				const uniqueTypes = Array.from(new Set(data.map((item) => item.type)));
				setProductTypes(uniqueTypes);
			}
		};

		fetchTypes();
		fetchProducts();
	}, []);

	return (
		<div className="p-4">
			<h2 className="text-3xl text-center font-bold my-12">
				Gestion des produits
			</h2>
			<div className="mb-8 flex flex-col sm:flex-row items-center justify-center">
				{!showAddForm && (
					<button
						onClick={() => setShowAddForm(true)}
						className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-96"
					>
						Ajouter un produit
					</button>
				)}
				{showAddForm && (
					<div className="mt-4 p-4 border rounded-lg w-full sm:w-96">
						<input
							type="text"
							placeholder="Titre"
							value={newProduct.title}
							onChange={(e) =>
								setNewProduct({ ...newProduct, title: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
						<select
							value={newProduct.type}
							onChange={(e) =>
								setNewProduct({ ...newProduct, type: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded text-stone-600 pr-8"
						>
							<option value="" className="text-stone-400">
								Sélectionner un type
							</option>
							{Object.entries(typeLabels).map(([value, label]) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</select>
						<input
							type="number"
							placeholder="Prix"
							value={newProduct.price}
							onChange={(e) =>
								setNewProduct({ ...newProduct, price: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
						<textarea
							placeholder="Description"
							value={newProduct.description}
							onChange={(e) =>
								setNewProduct({ ...newProduct, description: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
						<textarea
							placeholder="Parfums"
							value={newProduct.flavors}
							onChange={(e) =>
								setNewProduct({ ...newProduct, flavors: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
						<textarea
							placeholder="Ingrédients"
							value={newProduct.ingredients}
							onChange={(e) =>
								setNewProduct({ ...newProduct, ingredients: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
						<textarea
							placeholder="Allergènes"
							value={newProduct.allergens}
							onChange={(e) =>
								setNewProduct({ ...newProduct, allergens: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
						<input
							type="text"
							placeholder="URL de l'image"
							value={newProduct.image}
							onChange={(e) =>
								setNewProduct({ ...newProduct, image: e.target.value })
							}
							className="w-full p-2 mb-2 border rounded"
						/>
						<button
							onClick={(e) => {
								// Interesting: e.preventDefault() is used to prevent the form from being submitted
								e.preventDefault();
								// Interesting: newProduct.id is used to determine if the product is new or not
								newProduct.id ? updateProduct(newProduct.id) : addProduct();
							}}
							className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 w-full"
						>
							Enregistrer
						</button>
						<button
							onClick={() => {
								setShowAddForm(false);
								setNewProduct({
									id: 0,
									title: "",
									type: "",
									price: "",
									description: "",
									flavors: "",
									ingredients: "",
									allergens: "",
									image: "",
								});
							}}
							className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 w-full mt-2"
						>
							Annuler
						</button>
					</div>
				)}
			</div>
			{/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
			<div className="">
				{/*  */}
				<div>
					{Object.entries(typeLabels).map(([type, label]) => (
						<div key={type} className="mb-12">
							<h3 className="text-xl font-semibold mb-4">{label}</h3>
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
								{groupedProducts[type as ProductTypes].map((product) => (
									<div
										key={product.id}
										className="border rounded-xl p-4 cursor-pointer"
										onClick={() =>
											setSelectedProduct(
												selectedProduct === product.id ? null : product.id
											)
										}
									>
										<Image
											src={product.image}
											alt={product.title}
											width={150}
											height={150}
											style={{
												height: "100px",
												width: "100px",
												objectFit: "cover",
											}}
											className="rounded-lg"
										/>
										<p className="mt-6 text-sm text-stone-600">
											<strong>Titre : </strong>
											{product.title}
										</p>
										{/* <p className="mt-2 text-sm text-stone-600">
                                        <strong>Type : </strong>
                                        {product.type}
                                    </p> */}
										<p className="mt-2 text-sm text-stone-600">
											<strong>Type </strong>
											{product.type === "all"
												? "all : toutes les pâtisseries"
												: product.type === "star"
													? "star : les pâtisseries du moment"
													: product.type === "hero"
														? "hero : la pâtisserie en haut de page"
														: product.type === ""
															? "sans type : conservé mais non affiché"
															: product.type}
										</p>

										{selectedProduct === product.id && (
											<div className="mt-4 text-xs">
												<p>
													<strong>ID:</strong> {product.id}
												</p>
												{/* <p>
                                                <strong>Titre:</strong> {product.title}
                                            </p> */}
												<p>
													<strong>Type:</strong> {product.type}
												</p>
												<p>
													<strong>Prix:</strong> {product.price}€
												</p>
												<p>
													<strong>Description:</strong> {product.description}
												</p>
												<p>
													<strong>Parfums:</strong> {product.flavors}
												</p>
												<p>
													<strong>Ingrédients:</strong> {product.ingredients}
												</p>
												<p>
													<strong>Allergènes:</strong> {product.allergens}
												</p>
												<p>
													<strong>Créé le:</strong>{" "}
													{new Date(product.created_at).toLocaleDateString(
														"fr-FR"
													)}
												</p>
												<button
													onClick={() => {
														setNewProduct({
															...product,
															price: product.price.toString(),
														});
														setShowAddForm(true);
														// Scroll vers le haut de la page
														window.scrollTo({
															top: 0,
															behavior: "smooth",
														});
													}}
													className="bg-gray-500 hover:bg-gray-900 text-white text-sm px-3 py-2 mt-6 w-full"
												>
													Modifier
												</button>
												{/* Delete */}
												<button
													onClick={(e) => {
														e.stopPropagation(); // Empêche le toggle du selectedProduct
														deleteProduct(product.id);
													}}
													className="mt-6 bg-red-500 text-white w-full px-3 py-2 rounded-lg text-sm hover:bg-red-600"
												>
													Supprimer
												</button>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				{/*  */}
			</div>
		</div>
	);
};

export default ProductManager;
