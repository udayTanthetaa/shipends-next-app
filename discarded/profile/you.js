import { useEffect, useState } from "react";
import validator from "validator";
import { RelativeNotification, Button, IconInput, Heading, LinkedSubtitle } from "ui";
import { useContext } from "react";
import SessionContext from "session/sessionContext";
import { useRouter } from "next/router";
import Link from "next/link";

const You = () => {
	const Router = useRouter();

	const currSession = useContext(SessionContext);
	let { session } = currSession.state;

	const [status, setStatus] = useState({
		value: "LOADING",
		message: "",
	});

	useEffect(() => {
		const getUser = async () => {
			try {
				if (session !== undefined && session !== "") {
					const res = await fetch("/api/auth/getUser", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							token: session,
						}),
					});

					const data = await res.json();

					console.log(data);

					if (data.code === 201) {
						setStatus({
							value: "SUCCESS",
						});
					} else {
						setStatus({
							value: "ERROR",
							message: "",
						});
					}
				} else {
					setStatus({
						value: "ERROR",
						message: "",
					});
				}
			} catch (err) {
				setStatus({
					value: "ERROR",
					message: "",
				});
			}
		};

		getUser();
	}, [session]);

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen p-3 place-content-center">
				<Button
					cta="Loading"
					forceCta={true}
					loading={status.value === "LOADING" ? true : false}
					props={{
						intent: "primary",
						size: "lg",
						className: `h-10 ${status.value === "LOADING" ? "" : "hidden"}`,
					}}
				/>

				<Link
					href={{
						pathname: "/profile/signIn",
					}}
				>
					<Button
						cta="Click here to Sign In."
						forceCta={true}
						props={{
							intent: "primary",
							size: "lg",
							className: `${status.value === "ERROR" ? "" : "hidden"}`,
						}}
					/>
				</Link>
			</div>
		</>
	);
};

export default You;
