import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "La Pâtisserie de Sataa Diarra | Pâtisserie artisanale dans le Vexin",
	description:
		"Artisan pâtissière à Parnes (60240), Sataa Diarra crée des pâtisseries artisanales sur mesure pour vos événements dans le Vexin. Spécialisée dans les gâteaux personnalisés, wedding cakes et desserts d'exception. Livraison possible à 30 km autour de Parnes.",
	verification: {
		google: "VAyiRDAxhtraCKzjSqLA1mbQeemzqiJeBcLqrjBbIY0",
	},
	keywords:
		"pâtisserie artisanale, gâteaux sur mesure, pâtissière à domicile, Parnes, Vexin, Gisors, Magny-en-Vexin, Chaumont-en-Vexin, gâteaux personnalisés, desserts événementiels, pâtisserie maison, gâteaux d'anniversaire, wedding cake, Oise",
	authors: [{ name: "Sataa Diarra" }],
	openGraph: {
		title:
			"La Pâtisserie de Sataa Diarra | Pâtisserie artisanale dans le Vexin",
		description:
			"Artisan pâtissière à Parnes (60240), Sataa Diarra crée des pâtisseries artisanales sur mesure pour vos événements dans le Vexin.",
		url: "https://www.sataadiarra.fr/",
		siteName: "La Pâtisserie de Sataa Diarra",
		images: [
			{
				url: "https://www.sataadiarra.fr/logo-seo.jpg",
				width: 1200,
				height: 630,
			},
		],
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title:
			"La Pâtisserie de Sataa Diarra | Pâtisserie artisanale dans le Vexin",
		description:
			"Artisan pâtissière à Parnes (60240), Sataa Diarra crée des pâtisseries artisanales sur mesure pour vos événements dans le Vexin.",
		images: ["https://www.sataadiarra.fr/logo-seo.jpg"],
	},
	robots: {
		index: true,
		follow: true,
	},
	alternates: {
		canonical: "https://www.sataadiarra.fr/",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className={geistSans.className} suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				{children}
			</body>
		</html>
	);
}
