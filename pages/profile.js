import { useEffect, useState } from "react";
import validator from "validator";
import { motion } from "framer-motion";

const Profile = () => {
	const [user, setUser] = useState({
		username: "",
		password: "",
		email: "",
	});

	const [isValid, setIsValid] = useState({
		username: true,
		password: true,
		email: true,
	});

	const [isInitial, setIsInitial] = useState({
		username: true,
		password: true,
		email: true,
	});

	const [action, setAction] = useState("NONE");
	const [message, setMessage] = useState("");

	const getStatus = {
		SIGN_IN: {
			button: "Sign In",
		},
		SIGN_UP: {
			button: "Sign Up",
		},
		RESET_PASSWORD: {
			button: "Reset Password",
		},
	};

	const [status, setStatus] = useState("SIGN_IN");

	const editUser = async (e, property) => {
		let newUser = { ...user };

		newUser[property] = validator.trim(e.target.value);

		if (property === "email") {
			let newIsInitial = { ...isInitial };

			if (isInitial[property]) {
				newIsInitial[property] = false;
				setIsInitial(newIsInitial);
			}

			let newIsValid = { ...isValid };

			if (validator.isEmail(newUser[property])) {
				newIsValid[property] = true;
			} else {
				newIsValid[property] = false;
			}

			setIsValid(newIsValid);
		} else if (property === "username") {
			if (newUser[property] === "") {
				newUser[property] = "";
			} else if (!validator.isAlphanumeric(newUser[property])) {
				newUser[property] = user[property];
			}
		}

		// if (property === "username") {
		// 	let newIsInitial = { ...isInitial };

		// 	if (isInitial[property]) {
		// 		newIsInitial[property] = false;
		// 		setIsInitial(newIsInitial);
		// 	}

		// 	let newIsValid = { ...isValid };

		// 	const res = await fetch("/api/auth/isUser", {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		body: JSON.stringify({
		// 			username: newUser[property],
		// 		}),
		// 	});

		// 	const data = await res.json();

		// 	console.log(data.message);

		// 	if (data.message === "FOUND") {
		// 		newIsValid[property] = true;
		// 	} else {
		// 		newIsValid[property] = false;
		// 	}

		// 	setIsValid(newIsValid);
		// }

		setUser(newUser);
	};

	const getInput = (property, propertyDisplay) => {
		return (
			<input
				onChange={(e) => {
					editUser(e, property);
				}}
				value={user[property]}
				className={`mt-[6px] md:mt-[9px] lg:mt-[12px] w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] 
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl
                     font-semibold shadow-sm 
                    ${
						isInitial[property]
							? "bg-isWhite text-isGrayDarkEmphasis3 placeholder-isGrayLight3"
							: isValid[property]
							? "bg-isGreenDark text-isWhite placeholder-white"
							: "bg-isRedDark text-isWhite placeholder-white"
					}
                    `}
				type="text"
				placeholder={propertyDisplay}
			/>
		);
	};

	const getSubtitle = (headline, cta, ctaStatus) => {
		return (
			<div className="mt-[2px] md:mt-[4px] text-xs font-medium sm:text-sm md:text-md lg:text-lg text-isGrayLightEmphasis">
				{headline}&nbsp;
				<button
					onClick={() => {
						setStatus(ctaStatus);
						setUser({
							username: "",
							password: "",
							email: "",
						});

						setIsValid({
							username: true,
							password: true,
							email: true,
						});

						setIsInitial({
							username: true,
							password: true,
							email: true,
						});

						setMessage("");
						setAction("NONE");
					}}
					className="text-isBlueDark"
				>
					{cta}
				</button>
			</div>
		);
	};

	const emptyDiv = () => {
		return <div className="mt-[6px] md:[12px] lg:mt-[16px]" />;
	};

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

	const isValidRequest = () => {
		if (status === "SIGN_IN") {
			if (user.username === "" || user.password === "") {
				return true;
			} else {
				return false;
			}
		}
	};

	const sendAuthRequest = async () => {
		if (!isValidRequest) {
			setAction("NONE");
			return;
		}

		if (status === "SIGN_IN") {
			const res = await fetch("/api/auth/logIn", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: user.username,
					password: user.password,
				}),
			});

			const data = await res.json();

			if (data.token) {
				sessionContext.setSession(data.token);
				localStorage.setItem("shipper", data.token);
			}

			if (data.code !== "200") {
				setMessage(data.message);
			}
		} else if (status === "SIGN_UP") {
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

			if (data.code !== "200") {
				setMessage(data.message);
			}
		}

		setAction("NONE");
	};

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen bg-isGrayLightEmphasis6 place-content-center p-[12px]">
				{/* <img className="drop-shadow-sm" src="/favicon.ico" alt="Shipends Logo" /> */}

				<div className="mt-[6px] text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-isGrayDarkEmphasis6">
					Welcome to Shipends!
				</div>

				<div className="-mt-[4px]">
					{status === "SIGN_IN" || status === "RESET_PASSWORD" ? (
						getSubtitle("Don't have an account?", "Sign up here.", "SIGN_UP")
					) : (
						<></>
					)}
					{status === "SIGN_UP" ? getSubtitle("Have an account already?", "Sign in here.", "SIGN_IN") : <></>}
				</div>

				{emptyDiv()}

				{status === "SIGN_UP" || status === "RESET_PASSWORD" ? getInput("email", "Email") : <></>}
				{status === "SIGN_UP" || status === "SIGN_IN" ? getInput("username", "Username") : <></>}
				{status === "SIGN_UP" || status === "SIGN_IN" ? getInput("password", "Password") : <></>}
				{status === "RESET_PASSWORD" ? getInput("password", "New Password") : <></>}
				{status === "SIGN_IN" ? getSubtitle("Forgot Password?", "Reset here.", "RESET_PASSWORD") : <></>}

				{emptyDiv()}

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
						setMessage("");
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

				<div
					className={`mt-[12px] w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] 
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl
                    text-isWhite font-extrabold shadow-sm bg-isRedDark items-center flex flex-col 
                    ${message === "" ? "hidden" : "block"}
                    `}
				>
					{message}
				</div>
			</div>
		</>
	);
};

export default Profile;
