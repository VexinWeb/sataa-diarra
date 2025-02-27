import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Login(props: { searchParams: Promise<Message> }) {
	const searchParams = await props.searchParams;

	return (
		<div className="w-full mx-auto bg-white flex flex-col items-center justify-center">
			<div className="w-full bg-gray-600 flex flex-col items-center justify-center py-12">
				<h1 className="text-2xl font-bold text-white text-center">
					Connexion administratrice
				</h1>
			</div>
			<div className="py-12 px-4 w-96">
				<form className="flex-1 flex flex-col max-w-lg mx-auto">
					<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
						<Label htmlFor="email">Email</Label>
						<Input
							className="w-full p-2 mb-2 border-none"
							name="email"
							placeholder="you@example.com"
							required
						/>
						<Label htmlFor="password">Mot de passe</Label>
						<Input
							className="w-full p-2 mb-2 border-none"
							type="password"
							name="password"
							placeholder="Votre mot de passe"
							required
						/>
						<SubmitButton
							pendingText="Connexion en cours..."
							formAction={signInAction}
							className="bg-gray-600 hover:bg-gray-900 text-white text-center font-bold py-2 px-4 mt-2 rounded-lg cursor-pointer w-full"
						>
							Se connecter
						</SubmitButton>
						<FormMessage message={searchParams} />
					</div>
				</form>
			</div>
		</div>
	);
}
