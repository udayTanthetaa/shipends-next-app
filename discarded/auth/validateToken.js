import clientPromise from "../../../mongodb";
import UsersDAO from "../../../mongodb/dao/usersDAO";
import { isToken, isTokenValid } from "mongodb/utilities";
import { sendKeyResponse } from "responses";

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

			// sending success response
			sendKeyResponse(res, "SUCCESS");
		} catch (err) {
			sendKeyResponse(res, "BAD_REQUEST");
		}
	} else sendKeyResponse(res, "INVALID_ROUTE");
};

export default handler;
