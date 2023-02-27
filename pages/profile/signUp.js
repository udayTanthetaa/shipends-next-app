import { useEffect, useState } from "react";
import validator from "validator";
import { motion } from "framer-motion";
import { Typography, Input, Button, LinkedSubtitle } from "oldui";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const SignUp = () => {
	const [user, setUser] = useState({
		username: {
			value: "",
			isInitial: true,
			isValid: false,
		},
		password: {
			value: "",
			isInitial: true,
			isValid: false,
		},
		confirmPassword: {
			value: "",
			isInitial: true,
			isValid: false,
		},
		email: {
			email: "",
			isInitial: true,
			isValid: false,
		},
	});

	const [status, setStatus] = useState({
		value: "PENDING",
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
				newUser[property].isValid = true;
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
		} else if (property === "confirmPassword") {
			if (newUser[property].value !== user["password"].value) {
				newUser[property].isValid = false;
			} else {
				newUser[property].isValid = true;
			}
		}

		setUser(newUser);
	};

	const isValidRequest = () => {
		if (
			user.email.isValid === true &&
			user.username.isValid === true &&
			user.password.isValid === true
		) {
			return true;
		} else {
			return false;
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
				const data = {
					code: 201,
				};

				setStatus({
					...status,
					value: "ERROR",
					message: "Something Went Wrong!",
				});

				// toast.success("Email Sent.");

				// const res = await fetch("/api/auth/signUp", {
				// 	method: "POST",
				// 	headers: {
				// 		"Content-Type": "application/json",
				// 	},
				// 	body: JSON.stringify({
				// 		email: user.email.value,
				// 		username: user.username.value,
				// 		password: user.password.value,
				// 	}),
				// });

				// const data = await res.json();

				// setStatus({
				// 	...status,
				// 	value: data,
				// 	message: data.message,
				// });
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
		setStatus({
			value: "PENDING",
		});
	}, []);

	return (
		<>
			{/* <Toaster
				className="font-black"
				containerStyle={{
					top: 12,
				}}
				toastOptions={{
					duration: 2000,
					style: {
						background: "rgb(72, 72, 74)",
						color: "rgb(255, 255, 255)",
						fontWeight: 800,
					},
				}}
			/> */}
			<div className="flex flex-col items-center w-full min-h-screen p-3 place-content-center">
				{status.value === "SUCCESS" ? (
					<>
						<Typography
							cta="We just sent you an email verification link."
							props={{
								intent: "white",
								size: "xl",
								font: "bold",
								shadow: "none",
								w: "fit",
								maxw: "none",
								p: "md",
								className:
									"bg-isWhite rounded-xl shadow-sm bg-isGreenDark",
							}}
						/>
						<Typography
							cta="It will expire in 10 mins."
							props={{
								intent: "white",
								size: "md",
								font: "bold",
								shadow: "none",
								w: "fit",
								maxw: "none",
								p: "sm",
								className:
									"mt-3 bg-isWhite rounded-lg shadow-sm bg-isRedDark",
							}}
						/>
					</>
				) : (
					<>
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
							cta="Have an account already?"
							linkText="Sign In here."
							href={{
								pathname: "/profile/you",
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
									editUser(e, "email");
								}}
								value={user["email"].value}
								type="text"
								placeholder="Email"
								props={{
									intent: `${
										user["email"].isInitial
											? "white"
											: user["email"].isValid
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
									className: "mt-2",
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
								cta="Sign Up"
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
					</>
				)}
			</div>
		</>
	);
};

export default SignUp;
