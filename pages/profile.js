import { useEffect, useState } from "react";

const Profile = () => {
	// const status = {
	// 	createAccount: {},
	// 	resetPassword: {},
	// 	user: {},
	// };

	const [username, setUsername] = useState("uday");
	const [email, setEmail] = useState("uday.khokhariya@gmail.com");
	const [password, setPassword] = useState("12345678");

	// const [currStatus, setCurrStatus] = useState(status["createAccount"]);

	const signUp = async () => {
		const res = await fetch("/api/auth/signUp", {
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

	const logIn = async () => {
		const res = await fetch("/api/auth/login", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});
	};

	return (
		<>
			<h1>Profile</h1>

			<hr />
			<button
				onClick={(e) => {
					e.preventDefault();
					signUp();
				}}
			>
				Sign Up
			</button>
			<hr />
		</>
	);
};

export default Profile;
