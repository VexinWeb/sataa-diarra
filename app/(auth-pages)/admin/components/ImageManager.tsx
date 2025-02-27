"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FileObject } from "@supabase/storage-js";
import { ChangeEvent } from "react";

interface ImageFile extends FileObject {
	publicUrl?: string;
}

const ImageManager = () => {
	const [files, setFiles] = useState<ImageFile[]>([]);
	const [fileName, setFileName] = useState<string>("");
	const [uploading, setUploading] = useState(false);
	const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

	const supabase = createClient();

	const fetchImages = async () => {
		console.log("Début fetchImages");
		const { data, error } = await supabase.storage.from("images").list();

		console.log("Données reçues:", data);
		console.log("Erreur éventuelle:", error);

		if (data) {
			const filesWithUrls = data
				.filter((file) => !file.name.startsWith("."))
				.map((file) => {
					const {
						data: { publicUrl },
					} = supabase.storage.from("images").getPublicUrl(file.name);
					// console.log("URL publique générée:", publicUrl);
					return { ...file, publicUrl };
				});
			console.log("Files avec URLs:", filesWithUrls);
			setFiles(filesWithUrls);
		}
	};

	const validateFileName = () => {
		if (!fileName.trim()) {
			alert("Le nom du fichier est obligatoire");
			return false;
		}
		return true;
	};

	const uploadImage = async (file: File | Blob) => {
		if (!validateFileName()) return;

		const extension = file instanceof File ? file.name.split(".").pop() : "jpg";
		const uploadFileName = `${fileName}.${extension}`;

		return await supabase.storage.from("images").upload(uploadFileName, file, {
			cacheControl: "3600",
			upsert: false,
		});
	};

	const validateImageFormat = (file: File) => {
		const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
		const maxSize = 2 * 1024 * 1024; // 1MB

		if (!validTypes.includes(file.type)) {
			throw new Error("Format invalide. Utilisez JPG, PNG ou WEBP");
		}
		if (file.size > maxSize) {
			throw new Error("Image trop volumineuse. Maximum 1MB");
		}
	};

	const optimizeImage = async (file: File) => {
		return new Promise<Blob>((resolve, reject) => {
			const img = document.createElement("img");
			img.src = URL.createObjectURL(file);

			img.onload = () => {
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");

				// Dimensions maximales
				const maxWidth = 800;
				const maxHeight = 800;

				let width = img.width;
				let height = img.height;

				if (width > maxWidth) {
					height = (height * maxWidth) / width;
					width = maxWidth;
				}

				canvas.width = width;
				canvas.height = height;

				ctx?.drawImage(img, 0, 0, width, height);

				canvas.toBlob(
					(blob) => {
						if (blob) {
							// On compare les tailles et on garde la plus petite
							if (blob.size > file.size) {
								resolve(file);
							} else {
								resolve(blob);
							}
						} else {
							reject(new Error("Échec de l'optimisation"));
						}
					},
					// file.type, // Conserve le format d'origine
					"image/png",
					0.7
				);
			};
		});
	};

	const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// Ajout des logs
		console.log("Détails de l'image:", {
			taille: file.size,
			type: file.type,
			nom: file.name,
		});
		console.log("Fichier sélectionné:", file);

		if (!fileName.trim()) {
			alert("Le nom du fichier est obligatoire");
			return;
		}

		try {
			console.log("Début validation format");
			validateImageFormat(file);

			console.log("Début optimisation");
			const optimizedBlob = await optimizeImage(file);
			console.log("Blob optimisé:", optimizedBlob);

			const uploadFileName = `${fileName}.${file.name.split(".").pop()}`;
			console.log("Nom fichier:", uploadFileName);

			const { error } = await supabase.storage
				.from("images")
				.upload(uploadFileName, optimizedBlob);

			console.log("Résultat upload:", error ? "Erreur" : "Succès");

			if (error) throw error;

			fetchImages();
			event.target.value = "";
			setFileName("");
		} catch (error) {
			console.error("Erreur détaillée:", error);
		}
	};

	const deleteImage = async (fileName: string) => {
		const confirmDelete = window.confirm(
			"Êtes-vous sûr de vouloir supprimer cette image ?"
		);

		if (confirmDelete) {
			try {
				const { error } = await supabase.storage
					.from("images")
					.remove([fileName]);

				if (error) {
					throw error;
				}

				fetchImages();
			} catch (error) {
				console.error("Erreur lors de la suppression:", error);
			}
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<div className="py-12 px-4 bg-gray-200">
			<h2 className="text-3xl text-center font-bold py-12">
				Gestion des images
			</h2>

			<div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
				<input
					type="text"
					placeholder="Nom du fichier image"
					value={fileName}
					onChange={(e) => setFileName(e.target.value)}
					className="p-2 border rounded-lg w-full sm:w-96"
				/>
				<label className="bg-gray-600 hover:bg-gray-900 text-white text-center font-bold py-2 px-4 rounded-lg cursor-pointer w-full sm:w-96">
					{uploading ? "Ajout en cours..." : "Ajouter une image"}
					<input
						type="file"
						className="hidden"
						accept="image/*"
						onChange={handleImageUpload}
						disabled={uploading}
					/>
				</label>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{files.map((file) => (
					<div
						key={file.name}
						className="border rounded-xl p-4 w-full flex flex-col items-center justify-center"
					>
						<Image
							src={file.publicUrl || ""}
							alt={file.name}
							width={200}
							height={200}
							style={{
								height: "120px",
								width: "120px",
								objectFit: "cover",
							}}
							className="rounded-lg w-full"
						/>
						<p className="mt-2 text-sm text-stone-600">{file.name}</p>

						<button
							onClick={() => copyToClipboard(file.publicUrl || "")}
							className="mt-6 bg-gray-500 hover:bg-gray-900 text-white px-3 py-2 text-sm w-full"
						>
							Copier l'URL
						</button>

						<button
							onClick={() => deleteImage(file.name)}
							className="mt-6 bg-red-500 text-white w-full px-3 py-2 rounded-lg text-sm hover:bg-red-600"
						>
							Supprimer l'image
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default ImageManager;
