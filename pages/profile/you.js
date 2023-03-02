import { useEffect, useState } from "react";
import validator from "validator";
import { RelativeNotification, Button, IconInput, Heading, LinkedSubtitle } from "ui";
import { useContext } from "react";
import SessionContext from "session/sessionContext";
import { useRouter } from "next/router";

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

					if (data.code === 201) {
						console.log(data);
					} else {
						Router.replace("/profile/signIn");
					}
				} else {
					Router.replace("/profile/signIn");
				}
			} catch (err) {
				Router.replace("/profile/signIn");
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
						className: "h-10",
					}}
				/>
			</div>
		</>
	);
};

export default You;
