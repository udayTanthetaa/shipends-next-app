import clientPromise from "../../../mongodb";
import UsersDAO from "../../../mongodb/dao/usersDAO";
import { isToken, isTokenValid, isEmailValid, isUsernameValid, isPasswordValid } from "mongodb/utilities";
import { sendKeyResponse } from "responses";
import * as jwt from "jsonwebtoken";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			// setting client
			const client = await clientPromise;
			await UsersDAO.injectDB(client);

			// checking validation
			const { token } = req.body;
			if (!isToken(res, token)) return;
			if (!isTokenValid(res, token)) return;

			// getting user
			const user = jwt.decode(token);
			const email = user.email;
			const username = user.username;
			const password = user.password;

			// validating request
			if (!isEmailValid(res, email)) return;
			if (!isUsernameValid(res, username)) return;
			if (!isPasswordValid(res, password)) return;

			// verifying user
			await UsersDAO.verify(email, username, password, res);
		} catch (err) {
			sendKeyResponse(res, "BAD_REQUEST");
		}
	} else {
		sendKeyResponse(res, "INVALID_ROUTE");
	}
};

export default handler;
