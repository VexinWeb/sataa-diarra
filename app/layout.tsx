import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Meta from "../components/Meta";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className={geistSans.className} suppressHydrationWarning>
			<Meta />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				// Hide the hydration warning but keep the hydration warning
				suppressHydrationWarning={true}
			>
				{children}
			</body>
		</html>
	);
}
