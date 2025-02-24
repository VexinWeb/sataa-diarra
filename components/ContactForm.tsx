"use client";
// components/ContactForm.tsx
import { FC, FormEvent } from "react";

const ContactForm: FC = () => {
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Implémente ici la logique d'envoi du formulaire
	};

	return (
		<section
			className="px-4 py-12 bg-sataa/20 min-h-[100vh] lg:min-h-fit max-w-[1800px] mx-auto flex flex-col justify-center"
			id="ContactForm"
		>
			<div>
				<h2 className="text-2xl font-bold mb-2 text-stone-600/90 text-center">
					Me contacter
				</h2>
				<p className="mb-4 text-lg text-stone-500/90 text-center">
					Pour réserver votre pâtisserie
				</p>
				<form
					className="flex flex-col gap-4 max-w-lg mx-auto"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-col gap-2">
						<label htmlFor="name" className="font-medium">
							{/* Prénom & nom */}
						</label>
						<input
							type="text"
							id="name"
							className="p-4 border rounded-xl"
							placeholder="Votre nom"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="email" className="font-medium">
							{/* Email */}
						</label>
						<input
							type="email"
							id="email"
							className="p-4 border rounded-xl"
							placeholder="Votre email"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="phone" className="font-medium">
							{/* Téléphone */}
						</label>
						<input
							type="tel"
							id="phone"
							className="p-4 border rounded-xl"
							placeholder="Votre téléphone (facultatif)"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="message" className="font-medium">
							{/* Réserver une pâtisserie */}
						</label>
						<textarea
							id="message"
							className="p-4 border rounded-xl"
							placeholder="Votre message"
							rows={4}
						></textarea>
					</div>
					<button
						type="submit"
						// className="bg-stone-500 text-stone-100 font-bold my-4 p-5 border-none shadow-sm justify-between w-full"
						className="bg-stone-500/90 text-stone-100 font-bold my-4 p-5 border-stone-500 rounded-xl shadow-sm justify-between w-full"
					>
						Envoyer
					</button>
				</form>
			</div>
		</section>
	);
};

export default ContactForm;
