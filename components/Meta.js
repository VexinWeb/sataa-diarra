import React from "react";
import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
	return (
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<meta charSet="utf-8" />
			<link rel="icon" href="/favicon.ico" />
			<title>{title}</title>

			{/* Schema.org markup for Google */}
			<meta itemProp="name" content={title} />
			<meta itemProp="description" content={description} />
			<meta itemProp="image" content="/logo-seo.jpg" />

			{/* Twitter Card data */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content="/logo-seo.jpg" />

			{/* Open Graph data */}
			<meta property="og:title" content={title} />
			<meta property="og:type" content="business.business" />
			<meta property="og:url" content="https://www.sataadiarra.fr/" />
			<meta property="og:image" content="/logo-seo.jpg" />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content="La Pâtisserie de Sataa Diarra" />
			<meta property="og:locale" content="fr_FR" />
			<meta property="business:contact_data:locality" content="Parnes" />
			<meta property="business:contact_data:postal_code" content="60240" />
			<meta property="business:contact_data:country_name" content="France" />
		</Head>
	);
};

Meta.defaultProps = {
	title: "La Pâtisserie de Sataa Diarra | Pâtisserie artisanale dans le Vexin",
	keywords:
		"pâtisserie artisanale, gâteaux sur mesure, pâtissière à domicile, Parnes, Vexin, Gisors, Magny-en-Vexin, Chaumont-en-Vexin, gâteaux personnalisés, desserts événementiels, pâtisserie maison, gâteaux d'anniversaire, wedding cake, Oise",
	description:
		"Artisan pâtissière à Parnes (60240), Sataa Diarra crée des pâtisseries artisanales sur mesure pour vos événements dans le Vexin. Spécialisée dans les gâteaux personnalisés, wedding cakes et desserts d'exception. Livraison possible à 30 km autour de Parnes.",
};
export default Meta;
