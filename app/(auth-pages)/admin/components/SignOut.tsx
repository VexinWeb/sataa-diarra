"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOut() {
	const router = useRouter();

	const handleSignOut = async () => {
		const supabase = createClient();
		await supabase.auth.signOut();
		router.push("/");
	};

	return (
		<div className="relative">
			<div className="absolute text-xs text-white p-8 top-6 right-0">
				État : connectée
			</div>
			<button
				onClick={handleSignOut}
				className="bg-red-400 hover:bg-red-500 text-white text-sm px-8 py-2 absolute top-0 right-0"
			>
				Déconnexion
			</button>
		</div>
	);
}
