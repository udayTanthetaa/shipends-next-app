import { useEffect, useState } from "react";
import validator from "validator";
import { motion } from "framer-motion";
import { Typography, Input, Button, LinkedSubtitle } from "oldui";

const You = () => {
	const [user, setUser] = useState({
		username: {
			value: "",
			isInitial: true,
			isValid: true,
		},
		password: {
			value: "",
			isInitial: true,
			isValid: true,
		},
		email: {
			email: "",
			isInitial: true,
			isValid: true,
		},
	});

	const [status, setStatus] = useState({
		value: "LOADING",
	});

	const [reqStatus, setReqStatus] = useState({
		code: 0,
		message: "",
	});

	const editUser = async (e, property) => {
		let newUser = { ...user };

		newUser[property].value = validator.trim(e.target.value);

		if (user[property].isInitial === true) {
			newUser[property].isInitial = false;
		}

		if (property === "email") {
			if (
				newUser[property].value === "" ||
				!validator.isEmail(newUser[property].value)
			) {
				newUser[property].isValid = false;
			} else {
				newUser[property].isValid = false;
			}
		} else if (property === "username") {
			if (newUser[property].value === "") {
				newUser[property].isValid = false;
			} else if (!validator.isAlphanumeric(newUser[property].value)) {
				newUser[property].value = user[property].value;
				newUser[property].isValid = false;
			} else {
				newUser[property].isValid = true;
			}
		} else if (property === "password") {
			if (newUser[property].value === "") {
				newUser[property].isValid = false;
			} else {
				newUser[property].isValid = true;
			}
		}

		setUser(newUser);
	};

	const isValidRequest = () => {
		if (user.username.value === "" || user.password.value === "") {
			return false;
		} else {
			return true;
		}
	};

	const sendAuthRequest = async () => {
		if (!isValidRequest()) {
			setStatus({
				...status,
				value: "PENDING",
				message: "Invalid Details",
			});
			return;
		} else {
			setStatus({
				...status,
				value: "LOADING",
			});

			try {
				const res = await fetch("/api/auth/signIn", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: user.username.value,
						password: user.password.value,
					}),
				});

				const data = await res.json();

				if (data.token) {
					sessionContext.setSession(data.token);
					localStorage.setItem("shipper", data.token);
				}

				setStatus({
					...status,
					value: "PENDING",
					message: data.message,
				});
			} catch (err) {
				setStatus({
					...status,
					value: "PENDING",
					message: "Something Went Wrong!",
				});
			}
		}
	};

	useEffect(() => {
		setStatus(status);
	}, [status, user]);

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen p-3 place-content-center">
				<Typography
					cta="Welcome to Shipends!"
					props={{
						intent: "night",
						size: "2xl",
						font: "bold",
						shadow: "none",
						w: "full",
						max: "5xl",
						p: "none",
						className: "mb-1",
					}}
				/>

				<LinkedSubtitle
					cta="Don't have an account?"
					linkText="Sign Up here."
					href={{
						pathname: "/profile/signUp",
					}}
					props={{
						size: "sm",
						font: "medium",
						shadow: "none",
						w: "full",
						p: "none",
						intent: "gray",
						link: "primary",
					}}
				/>

				<div className="flex flex-col items-center w-full max-w-sm mt-3">
					<Input
						onChange={(e) => {
							editUser(e, "username");
						}}
						value={user["username"].value}
						type="text"
						placeholder="Username"
						props={{
							intent: `${
								user["username"].isInitial
									? "white"
									: user["username"].isValid
									? "success"
									: "error"
							}`,
							size: "md",
							font: "semibold",
							shadow: "sm",
							p: "md",
							w: "full",
						}}
					/>

					<Input
						onChange={(e) => {
							editUser(e, "password");
						}}
						value={user["password"].value}
						type="password"
						placeholder="Password"
						props={{
							intent: `${
								user["password"].isInitial
									? "white"
									: user["password"].isValid
									? "success"
									: "error"
							}`,
							size: "md",
							font: "semibold",
							shadow: "sm",
							p: "md",
							w: "full",
							className: "mt-2",
						}}
					/>

					<Button
						onClick={() => {
							sendAuthRequest();
						}}
						cta="Sign In"
						disabled={isValidRequest() ? false : true}
						props={{
							intent: "primary",
							size: "md",
							font: "extrabold",
							shadow: "sm",
							animate: "primary",
							w: "full",
							p: "md",
							className: `mt-2 ${
								isValidRequest()
									? "cursor-pointer"
									: "cursor-not-allowed"
							}`,
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default You;
