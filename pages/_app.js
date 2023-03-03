import "../styles/globals.css";
import "../styles/github.css";
import { Analytics } from "@vercel/analytics/react";
import { useRouter } from "next/router";
import { PageView } from "../lib/ga";
import { useEffect, useState } from "react";
import SessionContext from "session/sessionContext";
import { Navbar } from "ui";
import { motion } from "framer-motion";

const App = ({ Component, pageProps: { ...pageProps } }) => {
	const [mousePosition, setMousePosition] = useState({
		x: 0,
		y: 0,
	});

	const [cursorVariant, setCursorVariant] = useState("default");

	useEffect(() => {
		const mouseMove = (e) => {
			setMousePosition({
				x: e.clientX,
				y: e.clientY,
			});
		};

		window.addEventListener("mousemove", mouseMove);

		return () => {
			window.removeEventListener("mousemove", mouseMove);
		};
	}, []);

	const variants = {
		default: {
			x: mousePosition.x - 16,
			y: mousePosition.y - 16,
		},
	};

	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			PageView(url);
		};

		router.events.on("routeChangeComplete", handleRouteChange);

		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	const [session, setSession] = useState("");

	useEffect(() => {
		const authToken = localStorage.getItem("shipper");

		const sendAuthRequest = async ({ token }) => {
			try {
				const res = await fetch("/api/auth/validateToken", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token: token,
					}),
				});

				const data = await res.json();

				if (data.code === 201) {
					setSession(token);
				} else {
					localStorage.removeItem("shipper");
					setSession("");
				}
			} catch (err) {
				localStorage.removeItem("shipper");
				setSession("");
			}
		};

		if (authToken !== undefined && authToken !== null && session !== authToken) {
			sendAuthRequest({ token: authToken });
		}
	}, [session]);

	return (
		<>
			<div className="flex flex-col items-center w-full font-RobotoFlex bg-isGrayLightEmphasis6">
				<SessionContext.Provider
					value={{
						state: {
							session: session,
						},
						setSession: setSession,
					}}
				>
					{/* <motion.div
						className="fixed top-0 left-0 z-10 rounded-full shadow-sm bg-isGrayDarkEmphasis6 shadow-isGrayWhite w-7 h-7"
						variants={variants}
						animate={cursorVariant}
					></motion.div> */}
					<Navbar />
					<Component {...pageProps} />
					<Analytics />
				</SessionContext.Provider>
			</div>
		</>
	);
};

export default App;
