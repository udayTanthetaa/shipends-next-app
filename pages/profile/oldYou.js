import { useEffect, useState } from "react";

import validator from "validator";
import { motion } from "framer-motion";
// import { Welcome, Subtitle, EmptyDiv } from "../../components/Profile";

// import { Header, Button, Input } from "../../ui";

import { Button } from "ui";

const OldYou = () => {
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

	const getLoader = () => {
		return (
			<svg
				aria-hidden="true"
				className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 animate-spin text-isBlueDark fill-isWhite"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
		);
	};

	const editUser = async (e, property) => {
		let newUser = { ...user };

		newUser[property].value = validator.trim(e.target.value);

		if (user[property].isInitial === true) {
			newUser[property].isInitial = false;
		}

		if (property === "email") {
			if (newUser[property].value === "" || !validator.isEmail(newUser[property].value)) {
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
			let newStatus = status;
			newStatus.value = "PENDING";
			newStatus.message = "Invalid Details";
			setStatus(newStatus);

			console.log(newStatus);
			return;
		} else {
			let newStatus = status;
			newStatus.value = "LOADING";
			setStatus(newStatus);

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

				newStatus.value = "PENDING";
				newStatus.message = data.message;
				setStatus(newStatus);
			} catch (err) {
				newStatus.value = "PENDING";
				newStatus.message = "Something Went Wrong";
				setStatus(newStatus);
			}
		}
	};

	useEffect(() => {
		setStatus(status);
	}, [status, user]);

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen bg-isGrayLightEmphasis6 place-content-center p-[12px]">
				<img className="drop-shadow-sm" src="/favicon.ico" alt="Shipends Logo" />

				<Header
					cta="Welcome to Shipends!"
					props={{
						intent: "night",
						size: "3xl",
						font: "bold",
						shadow: "none",
						animate: "none",
						w: "full",
					}}
				/>

				<Subtitle className="" headline="Don't have an account?" cta="Sign up here." path="signUp" />

				<div className="flex flex-col items-center mt-[16px] md:mt-[20px] lg:mt-[24px] w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] space-y-[4px] md:space-y-[8px] lg:space-y-[12px]">
					<Input
						onChange={(e) => {
							editUser(e, "username");
						}}
						value={user["username"].value}
						type="text"
						placeholder="Username"
						props={{
							intent: `${
								user["username"].isInitial ? "white" : user["username"].isValid ? "success" : "error"
							}`,
							size: "md",
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
								user["password"].isInitial ? "white" : user["password"].isValid ? "success" : "error"
							}`,
							size: "md",
							w: "full",
						}}
					/>

					<Subtitle headline="Forgot password?" cta="Reset here." path="resetPassword" />

					<Button
						onClick={() => {
							sendAuthRequest();
						}}
						cta={status === "LOADING" ? getLoader() : "Sign In"}
						disabled={isValidRequest() ? false : true}
						props={{
							intent: "primary",
							size: "lg",
							font: "bold",
							shadow: "sm",
							animate: "primary",
							w: "full",
							p: "xl",
						}}
					/>
				</div>

				<div
					className={`mt-[12px] w-full
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl text-center
                    text-isWhite font-extrabold shadow-sm  items-center  
                    ${reqStatus.message === "" ? "hidden" : "flex flex-col"}
					${
						reqStatus.code === 201
							? "bg-isGreenDark max-w-xl"
							: "bg-isRedDark max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px]"
					}
					
                    `}
				>
					{reqStatus.message}
				</div>

				{/* 

				{status === "SIGN_UP" || status === "RESET_PASSWORD" ? getInput("email", "Email") : <></>}
				{status === "SIGN_UP" || status === "SIGN_IN" ? getInput("username", "Username") : <></>}
				{status === "SIGN_UP" || status === "SIGN_IN" ? getInput("password", "Password") : <></>}
				{status === "RESET_PASSWORD" ? getInput("password", "New Password") : <></>}
				{status === "SIGN_IN" ? getSubtitle("Forgot Password?", "Reset here.", "RESET_PASSWORD") : <></>}

				{emptyDiv()}

				{status === "SUCCESS" ? (
					<></>
				) : (
					<motion.button
						whileHover={{
							transition: { duration: 0.02 },
						}}
						whileTap={{
							scale: 0.95,
							transition: { duration: 0.02 },
						}}
						onClick={() => {
							setAction("LOADING");
							setReqStatus({
								code: "",
								message: "",
							});
							sendAuthRequest();
						}}
						className={`mt-[12px] w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] 
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl
                    text-isWhite font-extrabold shadow-sm bg-isBlueDark items-center flex flex-col cursor-pointer
                    ${isValidRequest() ? "" : "disabled"}
                    `}
					>
						{action === "NONE" ? getStatus[status].button : getLoader()}
					</motion.button>
				)}

				<div
					className={`mt-[12px] w-full
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl text-center
                    text-isWhite font-extrabold shadow-sm  items-center flex flex-col 
                    ${reqStatus.message === "" ? "hidden" : "block"}
					${
						reqStatus.code === 201
							? "bg-isGreenDark max-w-xl"
							: "bg-isRedDark max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px]"
					}
					
                    `}
				>
					{reqStatus.message}
				</div> */}
			</div>
		</>
	);
};

export default OldYou;
