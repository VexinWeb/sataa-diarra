import SignOut from "@/app/(auth-pages)/admin/components/SignOut";
import AdminNavbar from "@/app/(auth-pages)/admin/components/AdminNavbar";
import ProductManager from "./components/ProductManager";
import ImageManager from "./components/ImageManager";

export default function AdminPage() {
	return (
		<div className="max-w-[1800px] mx-auto bg-white">
			<SignOut />
			<AdminNavbar />
			<ProductManager />
			<br />
			<ImageManager />
		</div>
	);
}
