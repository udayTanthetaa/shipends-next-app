import { Button } from "ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const Verify = () => {
	const Router = useRouter();

	const [status, setStatus] = useState({
		value: "LOADING",
		message: "Creating Account",
	});

	useEffect(() => {
		const verifyAccount = async () => {
			try {
				if (Router.query.token === undefined) {
					return;
				}

				const res = await fetch("/api/auth/verify", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						token: `${Router.query.token}`,
					}),
				});

				const data = await res.json();

				if (data.code !== 201) {
					setStatus({
						value: "ERROR",
						message: data.message,
					});
				} else {
					setStatus({
						value: "SUCCESS",
						message: data.message,
					});
				}
			} catch (err) {
				setStatus({
					value: "ERROR",
					message: "Network Error",
				});
			}
		};

		verifyAccount();
	}, [Router]);

	return (
		<>
			<div className="flex flex-col items-center w-full min-h-screen p-3 place-content-center">
				<Button
					cta={status.message}
					forceCta={true}
					loading={status.value === "LOADING" ? true : false}
					props={{
						intent:
							status.value === "LOADING" ? "primary" : status.value === "SUCCESS" ? "success" : "error",
						size: "lg",
						w: "full",
						className: "max-w-6xl",
					}}
				/>
				<Link
					target="_self"
					rel="noopener noreferrer"
					href={{
						pathname: "/profile/you",
					}}
				>
					<Button
						cta={status.value === "SUCCESS" ? "Click here to Sign In." : ""}
						forceCta={true}
						props={{
							intent: "primary",
							size: "lg",
							w: "fit",
							className: `mt-3 ${status.value === "SUCCESS" ? "" : "hidden"}`,
						}}
					/>
				</Link>
			</div>
		</>
	);
};

export default Verify;
