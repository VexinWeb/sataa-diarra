import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				sataa: "#a08356",
			},
		},
	},
	plugins: [
		heroui({
			layout: {
				disabledOpacity: "0.3", // opacity-[0.3]
				radius: {
					small: "2px", // rounded-small
					medium: "4px", // rounded-medium
					large: "6px", // rounded-large
				},
				borderWidth: {
					small: "1px", // border-small
					medium: "1px", // border-medium
					large: "2px", // border-large
				},
			},
			themes: {
				light: {},
				dark: {},
			},
		}),
	],
} satisfies Config;
