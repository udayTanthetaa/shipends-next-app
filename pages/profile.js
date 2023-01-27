import * as jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { useContext } from "react";
import SessionContext from "../session/sessionContext";

const Profile = () => {
	// const status = {
	// 	createAccount: {},
	// 	resetPassword: {},
	// 	user: {},
	// };

	const sessionContext = useContext(SessionContext);
	let { session } = sessionContext.state;

	const [username, setUsername] = useState("uday");
	const [email, setEmail] = useState("uday.khokhariya@gmail.com");
	const newEmail = "updated@gmail.com";
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
		const res = await fetch("/api/auth/logIn", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		const data = await res.json();

		if (data.token) {
			sessionContext.setSession(data.token);
			localStorage.setItem("shipper", data.token);
		}

		alert(data.message);
	};

	const updateEmail = async () => {
		const res = await fetch("/api/auth/updateEmail", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: newEmail,
				token: sessionContext.state,
			}),
		});

		const data = await res.json();

		alert(data.message);
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

			<button
				onClick={(e) => {
					e.preventDefault();
					logIn();
				}}
			>
				Log In
			</button>
			<hr />
			<button
				onClick={(e) => {
					e.preventDefault();
					updateEmail();
				}}
			>
				Update Email
			</button>
		</>
	);
};

export default Profile;
