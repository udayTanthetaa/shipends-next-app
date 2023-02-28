import { useEffect, useState } from "react";
import validator from "validator";
import { RelativeNotification, Button, IconInput, Heading, LinkedSubtitle } from "ui";
import { motion } from "framer-motion";

const You = () => {
	const [user, setUser] = useState({
		email: "",
		username: "",
		password: "",
	});

	const [status, setStatus] = useState({
		value: "PENDING",
		message: "",
	});

	const editUser = async (e, property) => {
		if (property === "username" && e.target.value !== "") {
			if (validator.isAlphanumeric(validator.trim(e.target.value))) {
				setUser({
					...user,
					[property]: validator.trim(e.target.value),
				});
			}
		} else {
			setUser({
				...user,
				[property]: validator.trim(e.target.value),
			});
		}
	};

	const sendAuthRequest = async () => {
		try {
			setStatus({
				value: "LOADING",
				message: "",
			});

			const res = await fetch("/api/auth/signUp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: user.email,
					username: user.username,
					password: user.password,
				}),
			});

			const data = await res.json();

			setStatus({
				value: data.code === 201 ? "SUCCESS" : "ERROR",
				message: data.message,
			});
		} catch (err) {
			setStatus({
				...status,
				value: "PENDING",
				message: "Network Error",
			});
		}
	};

	useEffect(() => {
		if (status.value !== "SUCCESS" && status.message !== "") {
			setTimeout(async () => {
				setStatus({
					value: "PENDING",
					message: "",
				});
			}, 3000);
		}
	}, [status]);

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen p-3 place-content-center">
				<div
					className={`flex-col items-center w-full h-full
					${status.value === "SUCCESS" ? "hidden" : "flex"}
					`}
				>
					<Heading
						cta="Welcome to Shipends!"
						props={{
							className: "",
						}}
					/>

					<LinkedSubtitle
						href={{
							pathname: "/profile/you",
						}}
						cta="Have an account already?"
						linkText="Sign In here."
						mainProps={{
							className: "mt-1 mb-6",
						}}
					/>

					<div className="flex flex-col items-center w-full max-w-xs space-y-2 md:max-w-sm">
						<IconInput
							iconName="email"
							type="text"
							value={user.email}
							onChange={(e) => {
								editUser(e, "email");
							}}
							placeholder="Email"
							iconProps={{
								intent: "error",
							}}
						/>

						<IconInput
							iconName="profile"
							type="text"
							value={user.username}
							onChange={(e) => {
								editUser(e, "username");
							}}
							placeholder="Username"
							iconProps={{
								intent: "primary",
							}}
						/>

						<IconInput
							iconName="password"
							type="password"
							value={user.password}
							onChange={(e) => {
								editUser(e, "password");
							}}
							placeholder="Password"
							iconProps={{
								intent: "success",
							}}
						/>
					</div>

					<Button
						onClick={() => {
							sendAuthRequest();
						}}
						cta="Sign Up"
						loading={status.value === "LOADING" ? true : false}
						props={{
							intent: "primary",
							size: "lg",
							w: "full",
							className: "max-w-sm mt-6 h-10",
						}}
					/>

					<RelativeNotification
						text={status.message}
						props={{
							className: "mt-3",
						}}
					/>
				</div>

				<div
					className={`flex-col items-center w-full h-full
					${status.value === "SUCCESS" ? "flex" : "hidden"}
					`}
				>
					<Button
						cta={status.message}
						props={{
							intent: "success",
							size: "lg",
							w: "full",
							className: "max-w-6xl",
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default You;
