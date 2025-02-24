import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["ridmiittgggwatpqqsii.supabase.co"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "assets.example.com",
				port: "",
				pathname: "/account123/**",
				search: "",
			},
		],
	},
	// Ajoutez d'autres options de configuration ici si nécessaire
};

export default nextConfig;
