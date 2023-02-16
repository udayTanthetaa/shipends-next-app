import { useState } from "react";

const Profile = () => {
	const [user, setUser] = useState({
		username: "",
		password: "",
		email: "",
	});

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

	const editUser = (e, property) => {
		let newUser = { ...user };
		newUser[property] = e.target.value;
		setUser(newUser);
	};

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen bg-isGrayLightEmphasis6 place-content-center p-[12px]">
				{/* <img className="drop-shadow-sm" src="/favicon.ico" alt="Shipends Logo" /> */}
				<div className="mt-[6px] text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl text-isGrayDarkEmphasis6">
					Welcome to Shipends!
				</div>

				{status === "SIGN_IN" ? (
					<div className="-mt-[2px] mb-[8px] md:mb-[12px] lg:mb-[16px] text-xs font-medium sm:text-sm md:text-md lg:text-lg text-isGrayLightEmphasis">
						Don't have an account?{" "}
						<button
							onClick={() => {
								setStatus("SIGN_UP");
							}}
							className="text-isBlueDark"
						>
							Sign up here.
						</button>
					</div>
				) : (
					<></>
				)}

				{status === "SIGN_UP" ? (
					<div className="-mt-[2px] mb-[8px] md:mb-[12px] lg:mb-[16px] text-xs font-medium sm:text-sm md:text-md lg:text-lg text-isGrayLightEmphasis">
						Have an account already?{" "}
						<button
							onClick={() => {
								setStatus("SIGN_IN");
							}}
							className="text-isBlueDark"
						>
							Sign in here.
						</button>
					</div>
				) : (
					<></>
				)}

				{status === "SIGN_UP" ? (
					<input
						onChange={(e) => {
							editUser(e, "email");
						}}
						value={user.email}
						className="mt-[12px] w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] 
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl
                    text-isGrayDarkEmphasis3 font-medium shadow-sm bg-isGrayWhite"
						type="text"
						placeholder="Email"
					/>
				) : (
					<></>
				)}

				{status === "SIGN_UP" || "SIGN_IN" ? (
					<input
						onChange={(e) => {
							editUser(e, "username");
						}}
						value={user.username}
						className="mt-[12px] w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] 
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl
                    text-isGrayDarkEmphasis3 font-medium shadow-sm bg-isGrayWhite"
						type="text"
						placeholder="Username"
					/>
				) : (
					<></>
				)}

				{status === "SIGN_UP" || "SIGN_IN" ? (
					<input
						onChange={(e) => {
							editUser(e, "password");
						}}
						value={user.password}
						className="mt-[12px] w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] 
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl
                    text-isGrayDarkEmphasis3 font-medium shadow-sm bg-isGrayWhite"
						type="text"
						placeholder="Password"
					/>
				) : (
					<></>
				)}

				{status === "SIGN_IN" ? (
					<div className="items-end mt-[6px] mb-[12px] text-xs font-medium sm:text-xs md:text-sm lg:text-md text-isGrayLightEmphasis">
						Forgot Password?{" "}
						<button
							onClick={() => {
								setStatus("RESET_PASSWORD");
							}}
							className="text-isBlueDark"
						>
							Reset here.
						</button>
					</div>
				) : (
					<></>
				)}

				<button
					className="mt-[12px] w-full max-w-[250px] sm:max-w-[280px] md:max-w-[300px] lg:max-w-[350px] 
                    rounded-lg py-[8px] px-[16px] outline-none 
                    text-sm sm:text-md md:text-lg lg:text-xl
                    text-isWhite font-extrabold shadow-sm bg-isBlueDark "
					type="text"
					placeholder="Password"
				>
					{getStatus[status].button}
				</button>
			</div>
		</>
	);
};

export default Profile;
