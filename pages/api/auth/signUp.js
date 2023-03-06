import clientPromise from "../../../mongodb";
import UsersDAO from "../../../mongodb/dao/usersDAO";
import { isEmailValid, isUsernameValid, isPasswordValid } from "mongodb/utilities";
import { sendKeyResponse } from "responses";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			// setting client
			const client = await clientPromise;
			await UsersDAO.injectDB(client);

			// checking validation
			const { email, username, password } = req.body;
			if (!isEmailValid(res, email)) return;
			if (!isUsernameValid(res, username)) return;
			if (!isPasswordValid(res, password)) return;

			// signing up
			await UsersDAO.signUp(email, username, password, req, res);
		} catch (err) {
			sendKeyResponse(res, "BAD_REQUEST");
		}
	} else sendKeyResponse(res, "INVALID_ROUTE");
};

export default handler;
