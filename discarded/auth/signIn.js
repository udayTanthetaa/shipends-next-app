import clientPromise from "../../../mongodb";
import UsersDAO from "../../../mongodb/dao/usersDAO";
import { isUsernameValid, isPasswordValid } from "mongodb/utilities";
import { sendKeyResponse } from "responses";

const handler = async (req, res) => {
	if (req.method === "POST") {
		try {
			// setting client
			const client = await clientPromise;
			await UsersDAO.injectDB(client);

			// checking validation
			const { username, password } = req.body;
			if (!isUsernameValid(res, username)) return;
			if (!isPasswordValid(res, password)) return;

			// signing in
			await UsersDAO.signIn(username, password, res);
		} catch (err) {
			sendKeyResponse(res, "BAD_REQUEST");
		}
	} else sendKeyResponse(res, "INVALID_ROUTE");
};

export default handler;
