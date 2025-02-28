"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select from "react-select";

// Interface pour le produit tel qu'il est stocké en base de données
interface Product {
	id: number;
	title: string;
	type: string;
	price: number; // price est un number en base de données
	description: string;
	flavors: string;
	ingredients: string;
	allergens: string;
	image: string;
	created_at: string;
}

// Interface pour le produit dans le formulaire
interface ProductFormValues {
	id: number;
	title: string;
	type: string;
	price: string; // price est un string dans le formulaire
	description: string;
	flavors: string;
	ingredients: string;
	allergens: string;
	image: string;
}

const typeOptions = [
	{ value: "", label: "Pâtisseries non affichées" },
	{ value: "hero", label: "La pâtisserie en haut de page" },
	{ value: "star", label: "Les pâtisseries du moment" },
	{ value: "all", label: "Toutes les autres pâtisseries" },
];

const ProductSchema = Yup.object().shape({
	title: Yup.string().required("Le titre est requis"),
	type: Yup.string().required("Le type est requis"),
	price: Yup.string().required("Le prix est requis"),
	description: Yup.string().required("La description est requise"),
	ingredients: Yup.string().required("Les ingrédients sont requis"),
	image: Yup.string().required("L'URL de l'image est requise"),
	// Champs optionnels
	flavors: Yup.string(),
	allergens: Yup.string(),
});

const customStyles = {
	control: (provided: any, state: { isFocused: boolean }) => ({
		...provided,
		cursor: "pointer",
		padding: ".5rem",
		backgroundColor: "white",
		color: "#666",
		border: state.isFocused ? "1px solid #a8a29e" : "1px solid #e5e7eb",
		boxShadow: state.isFocused ? "0 0 0 2px rgba(168, 162, 158, 0.3)" : "none",
		transition: "all 0.2s ease",
		"&:hover": {
			borderColor: "#a8a29e",
		},
	}),
	placeholder: (provided: any) => ({
		...provided,
		color: "#999",
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: "#666",
	}),
	menu: (provided: any) => ({
		...provided,
		cursor: "pointer",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
		marginTop: "5px",
	}),
	menuList: (provided: any) => ({
		...provided,
		padding: "4px",
	}),
	option: (provided: any, state: { isSelected: boolean }) => ({
		...provided,
		cursor: "pointer",
		backgroundColor: state.isSelected ? "#f2f2f2" : "white",
		color: state.isSelected ? "#333" : "#666",
		"&:hover": {
			backgroundColor: "#e0e0e0",
		},
	}),
};

const ProductManager = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
	const [showAddForm, setShowAddForm] = useState(false);
	const [editingProduct, setEditingProduct] = useState<null | Product>(null);
	const [productTypes, setProductTypes] = useState<string[]>([]);
	const [isMounted, setIsMounted] = useState(false);

	const supabase = createClient();

	const fetchProducts = async () => {
		const { data, error } = await supabase
			.from("products")
			.select("*")
			.order("created_at", { ascending: false });

		if (data) setProducts(data);
	};

	const addProduct = async (
		formValues: ProductFormValues,
		formikHelpers: FormikHelpers<ProductFormValues>
	) => {
		// Convertir ProductFormValues en Product (sans id ni created_at)
		const productToAdd = {
			...formValues,
			price: parseFloat(formValues.price),
		};

		const { id, ...productWithoutId } = productToAdd;

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
		formikHelpers.resetForm();
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

	const updateProduct = async (
		formValues: ProductFormValues,
		formikHelpers: FormikHelpers<ProductFormValues>
	) => {
		// Convertir ProductFormValues en Product
		const productToUpdate = {
			...formValues,
			price: parseFloat(formValues.price),
		};

		const { error } = await supabase
			.from("products")
			.update(productToUpdate)
			.eq("id", formValues.id);

		if (error) {
			console.error("Erreur lors de la mise à jour:", error);
			return;
		}

		fetchProducts();
		setShowAddForm(false);
		setEditingProduct(null);
		formikHelpers.resetForm();
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
		setIsMounted(true);
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
						className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded-lg w-full sm:w-96"
					>
						Ajouter un produit
					</button>
				)}
				{showAddForm && (
					<div className="mt-4 p-4 border rounded-lg w-full max-w-xl mx-auto">
						<Formik
							initialValues={
								editingProduct
									? {
											id: editingProduct.id,
											title: editingProduct.title,
											type: editingProduct.type,
											price: editingProduct.price.toString(), // Convertir number en string
											description: editingProduct.description,
											flavors: editingProduct.flavors,
											ingredients: editingProduct.ingredients,
											allergens: editingProduct.allergens,
											image: editingProduct.image,
										}
									: {
											id: 0,
											title: "",
											type: "",
											price: "",
											description: "",
											flavors: "",
											ingredients: "",
											allergens: "",
											image: "",
										}
							}
							validationSchema={ProductSchema}
							onSubmit={(
								values: ProductFormValues,
								formikHelpers: FormikHelpers<ProductFormValues>
							) => {
								if (editingProduct) {
									updateProduct(values, formikHelpers);
								} else {
									addProduct(values, formikHelpers);
								}
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								setFieldValue,
								setFieldTouched,
							}) => (
								<Form className="space-y-4">
									<div className="flex flex-col gap-2">
										<Field
											name="title"
											type="text"
											placeholder="Titre"
											className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
										/>
										{errors.title && touched.title && (
											<div className="text-red-500 text-sm pl-4">
												{errors.title}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-2">
										{isMounted && (
											<Select
												instanceId="type-select"
												options={typeOptions}
												placeholder="Sélectionnez un type"
												styles={customStyles}
												value={typeOptions.find(
													(option) => option.value === values.type
												)}
												onChange={(option) => {
													setFieldValue("type", option?.value);
													setFieldTouched("type", true, true);
												}}
												onBlur={() => setFieldTouched("type", true)}
											/>
										)}
										{errors.type && touched.type && (
											<div className="text-red-500 text-sm pl-4">
												{errors.type}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<Field
											name="price"
											type="number"
											placeholder="Prix"
											className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
										/>
										{errors.price && touched.price && (
											<div className="text-red-500 text-sm pl-4">
												{errors.price}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<Field
											as="textarea"
											name="description"
											placeholder="Description"
											className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
										/>
										{errors.description && touched.description && (
											<div className="text-red-500 text-sm pl-4">
												{errors.description}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<Field
											as="textarea"
											name="flavors"
											placeholder="Parfums"
											className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
										/>
										{errors.flavors && touched.flavors && (
											<div className="text-red-500 text-sm pl-4">
												{errors.flavors}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<Field
											as="textarea"
											name="ingredients"
											placeholder="Ingrédients"
											className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
										/>
										{errors.ingredients && touched.ingredients && (
											<div className="text-red-500 text-sm pl-4">
												{errors.ingredients}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<Field
											as="textarea"
											name="allergens"
											placeholder="Allergènes"
											className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
										/>
										{errors.allergens && touched.allergens && (
											<div className="text-red-500 text-sm pl-4">
												{errors.allergens}
											</div>
										)}
									</div>

									<div className="flex flex-col gap-2">
										<Field
											name="image"
											type="text"
											placeholder="URL de l'image"
											className="w-full p-4 border focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
										/>
										{errors.image && touched.image && (
											<div className="text-red-500 text-sm pl-4">
												{errors.image}
											</div>
										)}
									</div>

									<div className="flex gap-2 pt-2">
										<button
											type="submit"
											className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 w-full transition-all"
										>
											{editingProduct ? "Mettre à jour" : "Enregistrer"}
										</button>

										<button
											type="button"
											onClick={() => {
												setShowAddForm(false);
												setEditingProduct(null);
											}}
											className="bg-gray-600 hover:bg-gray-900 text-white font-bold py-3 px-4 w-full transition-all"
										>
											Annuler
										</button>
									</div>
								</Form>
							)}
						</Formik>
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
													onClick={(e) => {
														e.stopPropagation();
														setEditingProduct(product);
														setShowAddForm(true);
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
