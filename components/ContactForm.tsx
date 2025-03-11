"use client";
import { FC, useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select, { StylesConfig } from "react-select";
import emailjs from "@emailjs/browser";

interface FormData {
	name: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
}

const subjectOptions = [
	{ value: "commande", label: "Commander une pâtisserie" },
	{ value: "devis", label: "Obtenir un devis personnalisé" },
	{ value: "info", label: "Renseignements et disponibilités" },
] as const;

type SubjectOption = (typeof subjectOptions)[number];

const validationSchema = Yup.object<FormData>({
	name: Yup.string().required("Votre nom est requis"),
	email: Yup.string()
		.email("Email invalide")
		.required("Votre email est requis"),
	phone: Yup.string().optional(),
	subject: Yup.string().required("Merci de sélectionner un sujet"),
	message: Yup.string().required("Votre message est requis"),
});

const customStyles: StylesConfig<SubjectOption, false> = {
	control: (provided, state) => ({
		...provided,
		cursor: "pointer", // Ajoute le curseur pointer au contrôle
		// border: "none",
		padding: ".5rem",
		backgroundColor: "white",
		borderRadius: "0.75rem",
		color: "#999",
		border: state.isFocused ? "1px solid #a8a29e" : "1px solid #e5e7eb", // Bordure stone-400 en focus
		boxShadow: state.isFocused ? "0 0 0 2px rgba(168, 162, 158, 0.3)" : "none", // Équivalent au ring
		transition: "all 0.2s ease",
		"&:hover": {
			borderColor: "#a8a29e", // stone-400
		},
	}),
	placeholder: (provided) => ({
		...provided,
		color: "#999",
	}),
	singleValue: (provided) => ({
		...provided,
		color: "#999",
	}),
	option: (provided, state) => ({
		...provided,
		cursor: "pointer", // Ajoute le curseur pointer au contrôle
		backgroundColor: state.isSelected ? "#f2f2f2" : "white",
		color: state.isSelected ? "#333" : "#666",
		"&:hover": {
			backgroundColor: "#e0e0e0",
		},
	}),
	menu: (provided) => ({
		...provided,
		cursor: "pointer", // Ajoute le curseur pointer au contrôle
		borderRadius: "0.75rem",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
		marginTop: "5px", // Espacement entre l'input et le menu
	}),
	menuList: (provided) => ({
		...provided,
		borderRadius: "0.75rem", // Assure-toi que c'est la même valeur que pour le menu
		padding: "4px", // Un peu de padding interne
	}),
};

const ContactForm: FC = () => {
	const [isMounted, setIsMounted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<{
		success: boolean;
		message: string;
	} | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const initialValues: FormData = {
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	};

	const handleSubmit = async (
		values: FormData,
		{ resetForm }: { resetForm: () => void }
	) => {
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			// Remplacez ces valeurs par vos IDs EmailJS
			const serviceId = "service_9yuhwis";
			const templateId = "template_0asojaa";
			const publicKey = "dyqOGcZNNcNTQ_ko8";

			// Préparer les données pour l'envoi
			// Convertir la valeur numérique du sujet en texte lisible
			const subjectText =
				subjectOptions.find((opt) => opt.value === values.subject)?.label ||
				values.subject;

			// Utiliser send au lieu de sendForm - pas besoin de formRef
			const result = await emailjs.send(
				serviceId,
				templateId,
				{
					from_name: values.name,
					from_email: values.email,
					from_phone: values.phone || "Non renseigné",
					subject: subjectText,
					message: values.message,
				},
				publicKey
			);

			if (result.status === 200) {
				setSubmitStatus({
					success: true,
					message:
						"Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.",
				});
				resetForm();
			}
		} catch (error) {
			console.error("Erreur lors de l'envoi du message:", error);
			setSubmitStatus({
				success: false,
				message:
					"Une erreur est survenue lors de l'envoi du message. Veuillez réessayer ultérieurement.",
			});
		} finally {
			setIsSubmitting(false);
		}
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

				{/* Ajoutez ceci après le paragraphe "Pour réserver votre pâtisserie" */}
				{submitStatus && (
					<div
						className={`p-4 mb-6 rounded-xl text-center max-w-lg mx-auto ${
							submitStatus.success
								? "bg-green-500 text-white"
								: "bg-red-500 text-white"
						}`}
					>
						{submitStatus.message}
					</div>
				)}

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({
						errors,
						touched,
						setFieldValue,
						setFieldTouched,
						validateField,
					}) => (
						// <Form className="flex flex-col gap-4 max-w-lg mx-auto">
						<Form className="flex flex-col gap-4 max-w-lg mx-auto">
							<div className="flex flex-col gap-2">
								<Field
									name="name"
									type="text"
									placeholder="Votre nom"
									className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
									required
									aria-required="true"
								/>
								{errors.name && touched.name && (
									<div className="text-red-500 text-sm  pl-4">
										{errors.name}
									</div>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<Field
									name="email"
									type="email"
									placeholder="Votre email"
									className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
									required
									aria-required="true"
								/>
								{errors.email && touched.email && (
									<div className="text-red-500 text-sm pl-4">
										{errors.email}
									</div>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<Field
									name="phone"
									type="tel"
									placeholder="Votre téléphone (facultatif)"
									className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
									required
									aria-required="true"
								/>
								{errors.phone && touched.phone && (
									<div className="text-red-500 text-sm">{errors.phone}</div>
								)}
							</div>
							<div className="flex flex-col gap-2">
								{isMounted && (
									<Select
										instanceId="subject-select"
										options={subjectOptions}
										placeholder="Sélectionnez un sujet"
										styles={customStyles}
										onChange={(option) => {
											setFieldValue("subject", option?.value);
											setFieldTouched("subject", true, true);
											setTimeout(() => validateField("subject"), 100);
										}}
										onBlur={() => setFieldTouched("subject", true)}
										className="rounded-xl"
										required
										aria-required="true"
									/>
								)}
								{errors.subject && touched.subject && (
									<div className="text-red-500 text-sm">{errors.subject}</div>
								)}
							</div>
							<div className="flex flex-col gap-2">
								<Field
									as="textarea"
									name="message"
									placeholder="Votre message"
									rows={4}
									className="p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all"
									required
									aria-required="true"
								/>
								{errors.message && touched.message && (
									<div className="text-red-500 text-sm pl-4">
										{errors.message}
									</div>
								)}
							</div>

							<button
								type="submit"
								className="bg-stone-500/90 text-stone-100 font-bold my-4 p-5 border-stone-500 rounded-xl shadow-sm justify-between w-full"
							>
								Envoyer
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
};

export default ContactForm;
