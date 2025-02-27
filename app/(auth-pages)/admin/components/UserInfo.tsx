"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const UserInfo = () => {
	const [userInfo, setUserInfo] = useState<{
		email: string;
		displayName: string | null;
	}>();
	const supabase = createClient();

	useEffect(() => {
		async function getUserInfo() {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				setUserInfo({
					email: user.email || "",
					displayName: user.user_metadata.display_name || null,
				});
			}
		}
		getUserInfo();
	}, []);

	return (
		<div className="text-sm text-white mb-4 text-center">
			{userInfo && (
				<>
					{userInfo.displayName && <p>Utilisateur : {userInfo.displayName}</p>}
					<p>Email : {userInfo.email}</p>
				</>
			)}
		</div>
	);
};

export default UserInfo;
