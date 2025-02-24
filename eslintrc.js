module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020, // pour utiliser des fonctionnalités modernes
		sourceType: "module", // pour permettre l'utilisation de import/export
		ecmaFeatures: {
			jsx: true, // pour supporter le JSX
		},
	},
	settings: {
		react: {
			version: "detect", // détecte automatiquement la version de React installée
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	plugins: ["@typescript-eslint", "react", "react-hooks"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"next/core-web-vitals",
	],
	rules: {
		// Vous pouvez personnaliser vos règles ici
		// Par exemple, pour désactiver une règle :
		// "react/prop-types": "off",
	},
};
