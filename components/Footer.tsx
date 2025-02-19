// components/Footer.tsx
import { FC } from "react";
import Image from "next/image";

const Footer: FC = () => {
	return (
		<footer className="flex p-4 h-32 bg-stone-200 justify-between items-center">
			<a
				className="text-xs text-stone-600"
				href="https://www.instagram.com/sataa_diarra?igsh=MXQwMzgwOWFmcjBiaw%3D%3D"
				target="_blank"
				rel="noopener noreferrer"
			>
				&copy; {new Date().getFullYear()}
				<br />
				La Pâtisserie de Sataa Diarra
				<br />
				Tous droits réservés
			</a>
			<a
				className="text-xs text-stone-600 flex gap-2 items-center justify-center"
				href="https://vexinweb.fr/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<div className="">Site réalisé par </div>
				<div>
					<Image
						className=""
						src="/images/vexinweb.png"
						alt="Logo VexinWEB"
						width={30}
						height={30}
					/>
				</div>
			</a>
		</footer>
	);
};

export default Footer;
