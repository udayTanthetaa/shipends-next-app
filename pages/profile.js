import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Profile = () => {
	const { data: session, status } = useSession();

	// const status = {
	// 	createAccount: {},
	// 	resetPassword: {},
	// 	user: {},
	// };

	const [username, setUsername] = useState("uday");
	const [email, setEmail] = useState("uday.khokhariya@gmail.com");
	const [password, setPassword] = useState("12345678");

	// const [currStatus, setCurrStatus] = useState(status["createAccount"]);

	const createAccount = async () => {
		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		});

		const data = await res.json();

		alert(data.message);
	};

	return (
		<>
			<h1>Profile</h1>
			<hr />
			{session ? "Signed in." : "Not signed in."}
			<hr />
			<button
				onClick={(e) => {
					e.preventDefault();
					createAccount();
				}}
			>
				Sign Up
			</button>
			<hr />
			<button
				onClick={async (e) => {
					e.preventDefault();

					const status = await signIn("credentials", {
						redirect: false,
						username: username,
						password: password,
					});

					console.log(session);
				}}
			>
				Sign In
			</button>
		</>
	);
};

export default Profile;
