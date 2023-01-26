// import { signIn } from "next-auth/client";
import { useState } from "react";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, seEmail] = useState("");
	const [password, setPassword] = useState("");

	const signup = async (e) => {
		e.preventDefault();

		if (!email || !email.includes("@") || !password) {
			alert("Invalid details");
			return;
		}

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

		console.log(data);
	};

	return (
		<>
			<h1>sign up form</h1>
			<hr />
			<button
				onClick={() => {
					signup();
				}}
			></button>
		</>
	);
};

export default Signup;
